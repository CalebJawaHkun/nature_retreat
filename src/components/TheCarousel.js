import { useRef, useState, useEffect } from "react";
import { Capy, DaisyDog, Hopper, Mush, BennyDuck } from 'assets/chars/static/staticchars_barrel';
import { capy_idle, dog_idle, duck_idle, frog_idle, shroom_idle } from 'assets/chars/idle/idle_barrel';
import { capy_walk, dog_walk, duck_walk, frog_walk, shroom_walk } from 'assets/chars/walk/walk_barrel';
import './comstyles/carouselstyles.css';
import leftUI from 'assets/uicom/left.png';
import rightUI from 'assets/uicom/right.png';
import { useSound } from "./utils/SoundProvider";
import Animator from "./utils/Animator";
import { useNavigate } from "react-router-dom";
import Setting from "./utils/Settings";

function CharData(name, static_, idle, walk, id) {
    this.name = name;
    this.static_ = static_;
    this.idle = idle;
    this.walk = walk;
    this.id = id;
}

const Character = ({isCentered, ItemData, forConfirmation}) => {
    let {name, idle, walk, static_} = ItemData;

    let myStyles = 
    `
        .char {
            border: 2px solid brown;
            background-color: gold;
            width: 180px;
            height: 240px;
            margin: .5em;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            border-radius: .6em;
        }

        .char h2 {
            margin: 0;
            text-align: center;
        }

        .centered {
            transform: scale(1.08);
        }

    `;

    const imgStyles = {
        imageRendering: 'pixelated',
        width: `150px`,
        padding: '1em'
    };

    return (
        <>  
            <style> {myStyles} </style>
            <Setting/>
            <div 
            className={`char ${isCentered && 'centered'}`}>
                <h2> {name} </h2>
                <div className="img_con">
                    {
                        isCentered ? 
                        <Animator sprite={forConfirmation ? walk : idle} style={imgStyles}/>
                        :
                        <img src={static_} 
                        style={imgStyles} alt={name} title={name}/>
                    }
                </div>
            </div>
        </>

    )
} 

export {Character, CharData};

export default function TheCarousel() {

    let { playCancel, playClick, playSelect, playScroll } = useSound();

    let [chars, updateChars] = useState([
        new CharData('Capy', Capy, capy_idle, capy_walk, 0),
        new CharData('Daisy', DaisyDog, dog_idle, dog_walk, 1),
        new CharData('Hopper', Hopper, frog_idle, frog_walk, 2),
        new CharData('Mush', Mush, shroom_idle, shroom_walk, 3),
        new CharData('Benny', BennyDuck, duck_idle, duck_walk, 4)
    ]);

   
    let [centeredItem, updateCT] = useState(1);
    const carousel = useRef();

    const toLeft = () => {
        playScroll();
        updateChars(
            pre => [pre[pre.length - 1], ...pre.slice(0, pre.length - 1)]
        );

        updateCT(pre => pre > 0 ? --pre : chars.length - 1);
    };

    const toRight = () => {
        playScroll();
        updateChars(
            pre => [...pre.slice(1, pre.length), pre[0]]
        );

       updateCT(pre => (pre + 1) % chars.length);
    };

    let nav = useNavigate();

    const confirmSelect = () => {
        playSelect();
        let [selectedChar] = chars.filter(
            char => char.id === centeredItem
        );

        localStorage.setItem('selectedchar', JSON.stringify(selectedChar));
        
        nav('/charconfirm', {
            replace: true,
        }); 
    }

    return(
        <div className="wrapper">
            <h2> Select Your Character </h2>
            <div className="bg">
                <div className="container">
                    <button onClick={toLeft} className="left move"> <img src={leftUI}/> </button>

                    <div class="carousel" ref={carousel}>
                        {
                        chars.map(
                                (value, key) => 
                                <Character 
                                key={key} 
                                ItemData={value} 
                                isCentered={value.id == centeredItem}
                                />
                        )
                        }

                    </div>

                    <button onClick={toRight} className="right move"> <img src={rightUI}/> </button>
                </div>
                
            </div>
            <button className="select" onClick={confirmSelect}> <span> Select </span></button>
            
        </div>
    )
    
}

