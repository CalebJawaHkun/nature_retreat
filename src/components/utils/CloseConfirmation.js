import 'components/comstyles/closeconfirmation.css'
import { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function CloseConfirm({isVisible, updateVisibility}) {
    let nav = useNavigate();
    let loc = useLocation();


    return(
        <div className="confirmPcon" style={{display: isVisible ? 'block' : 'none'}}>
            <div className="confirmPopup">
                <div class="message">
                    <h2> Are you sure you want to quit this activity? </h2>
                    <p> You are about to quit participating in this activity! </p>
                </div>
                <div className="buttons">
                    <button onClick={() => nav('/main', {replace: true})}> I'm Sure </button>
                    <button onClick={() => updateVisibility(false)}> Nah </button>
                </div>
            </div>
        </div>
    )
}