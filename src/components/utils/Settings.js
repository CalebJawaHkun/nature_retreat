import { useSound } from "./SoundProvider";
import { useReducer, useState } from "react";
import addlogo from 'assets/uicom/add.png';
import sublogo from 'assets/uicom/sub.png';
import settinglogo from 'assets/uicom/settings.png';
import crossui from 'assets/uicom/cross.png';

import 'components/comstyles/settings.css'

export default function Setting() {

    const [turnedOn, revert] = useReducer(pre => !pre, false);

    const 
    {
        modifyMusicVolume, musicVolume,
        modifySFXVolume, sfxVolume,

        playCancel, playScroll, playMenu
    } = useSound();
    
    return (
        <>
           
            <div className="settings"
            style={{backgroundColor: `${turnedOn ? '#FFFC00' : 'transparent'}`}} >
               
                {
                    turnedOn ? 
                    (  
                        <> 
                            <h2> Settings </h2>
                            <div className="ui">
                                <VolumeInterface 
                                className={'Music'} 
                                currentLevel={musicVolume} 
                                updateLevel={modifyMusicVolume}/>
                
                                <VolumeInterface
                                className={'Sfx'}
                                currentLevel={sfxVolume}
                                updateLevel={modifySFXVolume}/>
                            </div>
                            
                            <img src={crossui} onClick={() => { revert(); playCancel();}}
                            className="closelogo"
                            title="Close" alt="Close Logo"/>
                        </>
                    )
                    :
                    (
                        <>
                            <img 
                            src={settinglogo} 
                            title="Settings" 
                            alt="Settings" 
                            className="settinglogo"
                            onClick={() => {revert(); playMenu()}}/>
                            
                        </>
                    )
                    
                    
                }
            </div>

        </>
    )
}


const VolumeInterface = ({currentLevel, updateLevel, className}) => {

    let {playScroll} = useSound();

    let decrease = () => { if(currentLevel > .1) updateLevel(pre => pre - .1); playScroll() };

    let increase = () => { if(currentLevel < .9) updateLevel(pre => pre + .1); playScroll() };

    let imgstyle = {
        imageRendering: 'pixelated',
        width: '50px',
        height: '50px'
    }

    return (
        <div className={`volumeInterface ${className ? className : ''}`}>
            <h3> {`${className} Volume Level`} </h3>
            <div className="io">
                <button onClick={decrease}>
                    <img src={sublogo} style={imgstyle}/>
                </button>
                <h1> {Math.round(currentLevel * 10)} </h1>
                <button onClick={increase}>
                    <img src={addlogo} style={imgstyle}/>
                </button>
            </div>
        </div>
    )
}