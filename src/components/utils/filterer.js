import { useState, useEffect, useReducer  } from "react";
import 'components/comstyles/Filterer.css';
function XY(x,y) {
    this.x = x;
    this.y =y;
}

function Cell(position) {
    this.position = position;
}
export default function Filterer({row, col}) {
    let [grid] = useState(
        new Array(row).fill(
         new Array(col).fill(null)
        )
     );

     let [tapped, add] = useState(new Array());
     let [hasBeenSubmited, revert] = useReducer(
        pre => !pre,
        false
     );

     const exists = (xy) => {
        for(var obj of tapped) {
            if(obj.x == xy.x && obj.y == xy.y) return true;
        }

        add(pre => [...pre, xy]); 
        return false;
     }

     const isTapped = (xy) => {
        for(var obj of tapped) {
            if(obj.x == xy.x && obj.y == xy.y) return true;
        }
     }

     const handleClick = (r, c, E) => {
        let theClicked = new XY(r, c);
        exists(theClicked);
   
     }

     let [finalResult, updateFinal] = useState(new Array());
     const handleSubmit = () => {
        console.log(tapped);

        updateFinal(
            pre => {
                let copyOfGrid = JSON.parse(JSON.stringify(grid));
                
                tapped.forEach(
                    XY => {
                        copyOfGrid[XY.x][XY.y] = new Cell(XY)
                    }
                );

                localStorage.setItem('boundlimited', JSON.stringify(copyOfGrid));
                return copyOfGrid;
            }
        );


        revert();

     }

     

     return (
        <div className="filtercon" style={{display: hasBeenSubmited ? 'none' : 'block'}}>
            <table className="filterer">
                <tbody>
                    {
                        grid.map(
                            (row, r) =>
                                <tr key={r}>
                                    {row.map(
                                        (cell, c) =>
                                            <td 
                                            key={`${r}${c}`} 
                                            onClick={
                                                isTapped(new XY(r, c)) ?
                                                null
                                                :
                                                E => handleClick(r, c, E)
                                            }
                                            className={`cell ${isTapped(new XY(r, c)) ? 'clicked' : ''}`}> {`${r},${c}`} </td>
                                    )}
                                </tr>
                        )
                    }
                </tbody>
            </table>
            <button onClick={handleSubmit}> Submit </button>
        </div>
     )
}