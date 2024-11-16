import { Navigate, useLocation, useNavigate, useState } from "react-router-dom";
import { Character, CharData } from "components/TheCarousel";
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import 'components/comstyles/charconfirmation.css';
import { useSound } from "./SoundProvider";

export default function CharConfirmation() {
   

    let {playCancel, playSelect} = useSound();
    
    let charStories = [
        `Meet Capy, the chillest of them all. 
        Known for his laid-back attitude, 
        Capy loves to float on calm rivers and can 
        nap just about anywhere. 
        He believes every problem can be solved with 
        a little relaxation and a lot of snacks. 
        If you're looking for a wise, 
        soothing guide, Capy’s got you covered.
        `,
        `Bubbly and full of energy, 
        Daisy the Dog is always up for a 
        new adventure. With her playful spirit 
        and loyal heart, she's the best friend 
        you could ask for. Daisy can’t wait to 
        join you, wagging her tail at every 
        exciting discovery along the way.`,
        `This little frog, named Hopper, is a curious 
        explorer with a knack for finding hidden 
        spots and secret paths. Hopper loves the 
        rain, hopping through puddles, and croaking 
        soft songs under the moonlight. If you're up 
        for a gentle journey of discovery, Hopper’s 
        ready to leap in!`,
        `Mellow and mysterious, Mush is a quiet friend 
        with a warm heart. Mush spends its days soaking 
        up the morning dew and sharing little secrets 
        about nature. If you’re looking for a companion 
        who brings peace and serenity, Mush is happy 
        to be by your side.`,
        `Benny the Duck is a free spirit with a love for 
        wandering. With a waddle full of purpose, Benny 
        enjoys every step, whether it's through gentle 
        streams or soft forest trails. With Benny, 
        expect a journey full of wonder and unexpected 
        little adventures!`
    ];

    const currentLoc = useLocation();
    let selectedchar = JSON.parse(localStorage.getItem('selectedchar'));


    let nav = useNavigate();

    if(selectedchar == null) return <Navigate to={'/charselect'} replace={true}/>

    let handleNo = () => {
        localStorage.removeItem('selectedchar');
        nav('/charselect', { replace: true });
        playCancel();
    }

    let handleYes = () => {
        playSelect();
        localStorage.setItem('charselected', true);
        nav('/main', { replace: true});
    }
    

    return(
        
        <div className="char-confirm">
            <h2> Are You Sure You want This </h2>
            <div className="text">
               <Character isCentered={true} ItemData={selectedchar} forConfirmation={toBeRequired}/>
               <div>
                    <p> {charStories[selectedchar.id]} </p>
                    <div>
                        <button onClick={handleYes}> I'm Sure </button>
                        <button onClick={handleNo}> No </button>
                    </div>
               </div>
            </div>
        </div>
    ) 
} 