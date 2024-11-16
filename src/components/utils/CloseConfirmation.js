import 'components/comstyles/closeconfirmation.css'
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSound } from './SoundProvider';
import { useFeedback } from './FeedbackProvider';

export default function CloseConfirm({isVisible, updateMyVisibility}) {
    const { updateFbVisibility } = useFeedback();
    let nav = useNavigate();
    let loc = useLocation();

    let {playCancel, playSelect} = useSound();
    

    // app flow will be at main hub and teh visibility of the feedback will be set to true.
    // the respective activities will take care of which activity they just partook in.
    let handleSure = () => {
        playSelect();
        nav('/main', {replace: true});
        // seed the feedback visibility to true if he went back to the mainhub.
        updateFbVisibility(true);

    }

    let handleCancel = () => {
        playCancel();
        updateMyVisibility(false);
    }

    return(
        <div className="confirmPcon" style={{display: isVisible ? 'block' : 'none'}}>
            <div className="confirmPopup">
                <div className="message">
                    <h2> Are you sure you want to quit this activity? </h2>
                    <p> You are about to quit participating in this activity! </p>
                </div>
                <div id="buttons">
                    <button onClick={handleSure}> I'm Sure </button>
                    <button onClick={handleCancel}> Nah </button>
                </div>
            </div>
        </div>
    )
}