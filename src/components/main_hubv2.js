import { useState, useEffect, useRef, useReducer } from "react";
import 'components/comstyles/mainhubv2.css';
import { mapBoundary, XY } from "model/Storage";
import Animator from "./utils/Animator";
import { duck_idle } from "assets/chars/idle/idle_barrel";
import { duck_walk } from "assets/chars/walk/walk_barrel";
import Storage from "model/Storage";

import { useLocation, useNavigate } from "react-router-dom";


function Cell(position) {
    this.position = position;
}

function Activity(name, position, url) {
    this.name = name;
    this.position = position;
    this.url = url;
    this.isClickable = false;
}

function ActivityWindow({activityObj}) {
    let nav = useNavigate();
    let {name, position, url, isClickable} = activityObj;
    let [isVisible, turn] = useReducer(pre => !pre, false);

    const handleClick = () => {
        turn();
    }

    return (
        <div 
        onClick={isClickable ? handleClick : null}
        className={`activity `}
        style={{
            position: 'fixed',
            top: `${position.y}px`,
            left: `${position.x}px`,
            width: '50px',
            height: '50px',
            borderRadius: '5em',
            backgroundColor: 'white',
            border: '3px solid black',
            zIndex: '5',
            cursor: 'pointer'
        }}>
            <div style={{
                display: `${isVisible ? 'flex' : 'none'}`,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '250px',
                height: '120px',
                padding: '0 1em 1em',
                backgroundColor: '#dbae58',
                borderRadius: '.3em',
                position: 'absolute',
                bottom: '50px',
                left: '-100px'
            }}>
                <h2> {name} </h2>
                <button style={{
                    fontSize: '1.3em'
                }} onClick={() => nav(url, {replace: true})}> Explore </button>
            </div>
        </div>
    )
}

export default function Main_Hub({showBoundary=false}) {
    let loc = useLocation();
    let {state} = loc;

    let selectedChar = Storage.selectedCharacter;
    let {walk, idle} = selectedChar;
    console.log(selectedChar);

    let [grid, updateGrid] = useState(
       new Array(10).fill(
        new Array(15).fill(
            null
        )
       )
    );

    // cells records all the Real-time dom refereces of cells.
    let cells = useRef([]);
    let [currentPos, updateCP] = useState(null);

    useEffect(
        () => {
            updateGrid(
                pre => {
                    let copyOfPre = JSON.parse(JSON.stringify(pre));

                    // only for the cells that are set by the map boundary.
                    mapBoundary.forEach(
                        loc => {
                            let {x, y} = loc;
                            // the cell from DOM.
                            let cellElement = cells.current[x * 15 + y];

                            const rect = cellElement.getBoundingClientRect();
                            let centerX = Math.floor(rect.left + rect.width / 2);
                            let centerY = Math.floor(rect.top + rect.height / 2);
                            copyOfPre[x][y] = new XY(centerX, centerY);
                            
                        }
                    );

                    console.log(copyOfPre);
                    updateCP(copyOfPre[4][0]);

                   
                    return copyOfPre;
                }
            )
        }, []
    );



    const [isMoving, revert] = useReducer(pre => !pre, false);

    const imgStyles = {
        imageRendering: 'pixelated',
        width: `130px`,
        padding: '1em'
    };

    let [activities, updateActs] = useState([
        new Activity('Gardening', new XY(600, 400), '/act_garden'),
        new Activity('Reflection', new XY(550, 700), '/act_diary'),
        new Activity('Meditation', new XY(1370, 550)),
        new Activity('Breathing Exercise', new XY(1500, 1000))
    ]);

    // a function that check where the current chracter is at compared to the board.
    const nearWhere = (posToCheck) => {
        let nears = [
            [new XY(3, 3), new XY(3, 4), new XY(4, 3), new XY(4, 4)],
            [new XY(5, 3), new XY(5, 4), new XY(6, 3), new XY(6, 4)],
            [new XY(5, 9), new XY(5, 10)],
            [new XY(8, 10), new XY(8, 11), new XY(9, 10), new XY(9, 11)]
        ];

        let who = 0;

        for(let coords of nears) {
            for(let coord of coords) {
                let {x: cellPosX, y: cellPosY} = grid[coord.x][coord.y];
                let {x: cX, y: cY} = posToCheck;

                if(cellPosX == cX && cellPosY == cY) {
                    let theActivity = activities[who];
                    console.log('Near: ', theActivity.name);
                    return who;
                }
            }

            ++who;
        }

        console.log('Near Nothing.');
    }

    let setClickable = actIndex => {
        updateActs(
            pre => {
                console.log(actIndex);
                let copyOfPre = JSON.parse(JSON.stringify(pre));
                
                for(var index in copyOfPre) {
                    console.log(copyOfPre[index]);
                    copyOfPre[index].isClickable = actIndex == index;
                }

                console.log(copyOfPre);
                return copyOfPre;
            }
        );

        
    }

    let handleClick = (x, y, E) => {
        let clickedLoc = grid[x][y];
        updateCP(clickedLoc);
        revert();
        setTimeout(() => revert(), 2000);
        console.log(clickedLoc);

        let near = nearWhere(clickedLoc);
        console.log(near);
        setClickable(near);
    }

    const getBgColor = (x, y) => grid[x][y] ? 'green' : 'red';
    // returns a function that allows the user to click on, on constraint. 
    const getOnClick = (x, y) => grid[x][y] ? () => handleClick(x, y) : null;
    return (
        <div className="mainhub">
            <>
                {
                    currentPos
                    &&
                    <div className="character"
                    style={{
                        position: 'absolute',
                        top: `${currentPos.y - 80}px`,
                        left: `${currentPos.x - 80}px`,
                        
                    }}> 
                        <Animator sprite={isMoving ? walk : idle} style={imgStyles}/>
                    </div>
                }
            </>

            {
                activities.map(
                    (act) => <ActivityWindow activityObj={act}/>
                )
            }
            
            <table className="displaypos">
                <tbody>
                    {
                        grid.map(
                            (row, r) =>
                                <tr key={r}>
                                    {row.map(
                                        (cell, c) =>
                                            <td 
                                            style={{
                                                backgroundColor: showBoundary ? getBgColor(r, c) : ''
                                            }}
                                            className={`${getBgColor(r, c)}`}
                                            key={`${r}${c}`}
                                            ref={el => {cells.current[r * 15 + c] = el}}
                                            onClick={getOnClick(r, c)}>  </td>
                                    )}
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}