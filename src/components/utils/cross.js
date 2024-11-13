import cross from 'assets/uicom/cross.png';
import CloseConfirm from './CloseConfirmation';
import { useState } from 'react';
export default function Cross({size = 50, top = 0, left = 0, z = 5}) {


    let [isVisible, changeVisibility] = useState(false);
    let myStyle = 
    `
        .buttonCon {
            display: inline-block;
        
        }

        .cancelButton {
            border: 1px solid black;
            background-color: transparent;
            left: 6.8in;
            top: 1in;
            width: ${size}px;
            height: ${size}px;
            position: absolute;
            top: ${top}px;
            left: ${left}px;
             z-index: ${z};
        }

        .cancelButton img {
            image-rendering: pixelated;
            width: 100%;
        }
    `;

    let handleClick = () => {
        changeVisibility(true);
    }

    return (
        <>
            <style> {myStyle} </style>
                <button className="cancelButton" onClick={handleClick}> 
                    <img src={cross}/>
                </button> 

            <CloseConfirm isVisible={isVisible} updateVisibility={changeVisibility}/>

        </>
    );
}