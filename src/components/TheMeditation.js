import ReactHowler from "react-howler";
import { useSound } from "./utils/SoundProvider";
import { GM1, GM2, MM1, MM2 } from "assets/SfxSongs/Meditation/meditation_songs_barrel";
import { useEffect, useReducer, useState } from "react";
import sunsetlake from 'assets/bg/dynamic/YellowAutumnTree_LW.mp4';
import 'components/comstyles/meditation.css';
import Setting from "./utils/Settings";
import CloseConfirm from "./utils/CloseConfirmation";
import { useFeedback } from "./utils/FeedbackProvider";

const TypeSelector = ({updateType}) => {

    const {playClick} = useSound();

    const handleClick = E => {
        playClick();
        updateType(E.target.id);
    }

    return(
        <div 
        className="typeselector">
            <h3> Select Type Of Meditation </h3>
            <div>
                <button 
                id="0" 
                className="select_btn" 
                onClick={handleClick}> Guided Meditation </button>
                <button 
                id="1" 
                className="select_btn" 
                onClick={handleClick}> Manual Meditation </button>
            </div>
        </div>
    )
}

function MSong(url, isPlaying) {
    this.url = url;
    this.isPlaying = isPlaying;
}

export default function Meditation() {
    const { playCancel, playSelect, playClick, playPause, musicVolume } = useSound();
    const [selectedType, updateType] =  useState(undefined);
    const [isPaused, revertPause] = useReducer(
        pre => !pre,
        false
    );
    const [selectedBg, updateSelectedBg] = useState(null);

    const [GMSongs, updateGms] = useState([
        new MSong(GM1, false),
        new MSong(GM2, false)
    ]);

    const [MMSongs, updateMms] = useState([
        new MSong(MM1, false),
        new MSong(MM2, false)
    ]);

    const [isAboutToQuit, updatetoQuit] = useState(false);

    const { updateActPartook } = useFeedback();
    updateActPartook(1);

    useEffect(() => {
        console.log(selectedType);
        updateSelectedBg(
            pre => {
                const selectedBgGroup = Number(selectedType) ? [...MMSongs] : [...GMSongs];
                const selectedSong = selectedBgGroup[Math.floor(Math.random() * selectedBgGroup.length)];
                selectedSong.isPlaying = true;
                console.log(selectedSong);

                return selectedSong;
            }
        );
    }, [selectedType]);

    const handlePauseResume = () => {
        selectedBg.isPlaying ? playPause() : playSelect();
        updateSelectedBg(
            pre => ({...pre, isPlaying: !pre.isPlaying})
        );
    }

    const handleQuit = () => {
        playClick();
        updatetoQuit(true);
    }

    return (
        <div className="mediwrapper">
            <Setting/>
            <div className="vidwrapper">
                <video id="meditation_vid" autoPlay loop muted>
                    <source src={sunsetlake} type="video/mp4"/>
                </video>
            </div>

            <CloseConfirm isVisible={isAboutToQuit} updateMyVisibility={updatetoQuit}/>

            {
                selectedBg && selectedType ? 
                (
                    <>
                        <div className="medaction"> 
                            <button onClick={handlePauseResume}> Tap to: {`${selectedBg.isPlaying ? 'Pause' : 'Resume'}`} </button>
                            <button onClick={handleQuit}> Quit </button>
                        </div>
                        {
                            selectedBg && 
                            (
                                <ReactHowler
                                src={selectedBg.url}
                                playing={selectedBg.isPlaying}
                                volume={musicVolume}
                                />
                            )
                        }
                    </>

                )
                :
                (
                    <TypeSelector updateType={updateType}/>
                )
            }
        </div>
    )

}