import React, { useState, useEffect } from "react";
import 'components/comstyles/breathingex.css';
import Setting from "./utils/Settings";
import Cross from "./utils/cross";
import { useSound } from "./utils/SoundProvider";
import { useFeedback } from "./utils/FeedbackProvider";
import { AS1, AS2 } from "assets/SfxSongs/BreathingEx/As_barrel";
import ReactHowler from "react-howler";

function Phase(name, min, max) {
    this.name = name;
    this.min = min;
    this.max = max;
}

function ASong(url, isPlaying) {
    this.url = url;
    this.isPlaying = isPlaying;
}

export default function BreathingExercise() {

    const {updateActPartook} = useFeedback();
    updateActPartook(1);
    const [phases] = useState([
        new Phase("Breath In", 4, 6),
        new Phase("Hold", 9, 12),
        new Phase("Exhale", 5, 7),
    ]);

    const [ASongs, updateASongs] = useState([
        new ASong(AS1, false),
        new ASong(AS2, false)
    ]);

    const [selectedASong, updateSelectedSong] = useState(undefined);

    useEffect(() => {
        updateSelectedSong(
            pre => {
                let theSong = ASongs[
                    Math.floor(
                        Math.random() * ASongs.length
                    )
                ];

                theSong.isPlaying = true;

                return theSong;

            }
        );
    }, [])

    const [duration, setDuration] = useState(0);
    const [phaseIndex, setPhaseIndex] = useState(0);
    const [size, setSize] = useState(1);
    const [paused, setPaused] = useState(false); // Controls pause/resume

    const getRandomDuration = (min, max) =>
        Math.round(Math.random() * (max - min)) + min;

    useEffect(() => {
        let timeout;

        const changePhase = () => {
            if (paused) return; // Do nothing if paused

            const currentPhase = phases[phaseIndex];
            const { min, max } = currentPhase;

            const phaseDuration = getRandomDuration(min, max);
            setDuration(phaseDuration);

            console.log("Phase:", currentPhase.name);
            console.log("Duration:", phaseDuration, "seconds.");

            // Adjust size based on phase
            if (phaseIndex === 0) {
                setSize(1.2);
            } else if (phaseIndex === 1) {
                setSize((prev) => prev);
            } else if (phaseIndex === 2) {
                setSize(1);
            }

            // Schedule the next phase change
            timeout = setTimeout(() => {
                setPhaseIndex((prevIndex) => (prevIndex + 1) % phases.length);
            }, phaseDuration * 1000);
        };

        changePhase(); // Start phase change
        return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [phaseIndex, paused, phases]);

    useEffect(() => {
        let interval;

        if (!paused && duration > 0) {
            interval = setInterval(() => {
                setDuration((prev) => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval); // Cleanup interval
    }, [paused, duration]);

    let {playClick, musicVolume} = useSound();

    const togglePause = () => { 
        playClick();
        setPaused((prev) => !prev);
    }

    return (
        <>
            <div className="breathing-exercise">
                <Setting/>
                <Cross top="40" left="1100"/>
                <div className="ui">
                    <h3> Follow Circle Movement </h3>
                    <div className="circle"
                    style={{
                        transform: `scale(${size})`,
                        transitionDuration: `${duration}s`

                    }}>
                        <p>{phases[phaseIndex].name}</p>
                    </div>
                    <h1>Duration: {duration}s</h1>
                    <button onClick={togglePause}>
                        {paused ? "Resume" : "Pause"}
                    </button>
                </div>
            </div>       
            {
                selectedASong &&
                <ReactHowler
                src={selectedASong.url}
                playing={selectedASong.isPlaying}
                loop={true}
                volume={musicVolume}/>
            }
        </>

    );
}
