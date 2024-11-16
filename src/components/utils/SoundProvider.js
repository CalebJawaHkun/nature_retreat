import { BGS1, BGS2, BGS3, BGS4 } from "assets/SfxSongs/BGSongs/BGSongsBarrel";
import { 
    CancelSFX, 
    SelectSFX, 
    ClickSFX, 
    ScrollSFX,
    PauseSFX,
    PageflipSFX,
    MenuSFX,
    PopSFX,
    ObjPlacedSFX
} 
from "assets/SfxSongs/SFX/SfxBarrel";

import React, { createContext, useContext, useState } from "react";
import ReactHowler from "react-howler";
import { v4 as uuidv4 } from 'uuid';

const soundContext = createContext();

function BGSong(index, loc, isPlaying) {
    this.index = index;
    this.loc = loc;
    this.isPlaying = isPlaying;
}

export default function SoundProvider({ children }) {
    const [sfxVolume, modifySFXVolume] = useState(0.5);
    const [musicVolume, modifyMusicVolume] = useState(0.5);
    const [activeSoundEffects, setActiveSoundEffects] = useState({});

    const MAX_INSTANCES = 3; // Limit of simultaneous instances per sound effect

    const playSoundEffect = (soundSrc) => {
        setActiveSoundEffects(prev => {
            const instances = prev[soundSrc] || [];
            if (instances.length >= MAX_INSTANCES) return prev; // Skip if max instances reached

            const soundId = uuidv4();
            return {
                ...prev,
                [soundSrc]: [...instances, soundId],
            };
        });
    };

    const removeSoundEffect = (soundSrc, soundId) => {
        setActiveSoundEffects(prev => ({
            ...prev,
            [soundSrc]: (prev[soundSrc] || []).filter(id => id !== soundId),
        }));
    };

    // Background music setup
    const [songCollection, updateSongCol] = useState([
        new BGSong(0, BGS1, false),
        new BGSong(1, BGS2, false),
        new BGSong(2, BGS3, false),
        new BGSong(3, BGS4, false)
    ]);

    const selectBgSong = (songIndex) => {
        updateSongCol(prev => prev.map(
            (song, idx) => ({ ...song, isPlaying: idx === songIndex })
        ));
    };

    const stopBgSong = () => {
        updateSongCol(prev => prev.map(
            song => ({...song, isPlaying: false})
        ));
    }

    const sharedData = {
        playCancel: () => playSoundEffect(CancelSFX),
        playClick: () => playSoundEffect(ClickSFX),
        playSelect: () => playSoundEffect(SelectSFX),
        playScroll: () => playSoundEffect(ScrollSFX),
        playPause: () => playSoundEffect(PauseSFX),
        playPageFlip: () => playSoundEffect(PageflipSFX),
        playMenu: () => playSoundEffect(MenuSFX),
        playPop: () => playSoundEffect(PopSFX), 
        playObjPlaced: () => playSoundEffect(ObjPlacedSFX),
        selectBgSong,
        modifyMusicVolume, musicVolume,
        modifySFXVolume, sfxVolume,
        stopBgSong
    };

    return (
        <soundContext.Provider value={sharedData}>
            {children}

            {/* Render ReactHowler instances for each active sound effect */}
            <div>
                {Object.entries(activeSoundEffects).flatMap(([src, ids]) =>
                    ids.map(id => (
                        <ReactHowler
                            key={id}
                            src={src}
                            volume={sfxVolume}
                            playing={true}
                            onEnd={() => removeSoundEffect(src, id)}
                        />
                    ))
                )}

                {/* Render background music */}
                {songCollection.filter(
                    ({isPlaying}) => isPlaying
                ).map(
                    ({isPlaying, loc}, index) => 
                        <ReactHowler
                        key={index}
                        src={loc}
                        loop={true}
                        playing={isPlaying}
                        volume={musicVolume}/>
                )}
            </div>
        </soundContext.Provider>
    );
}

export const useSound = () => useContext(soundContext);
