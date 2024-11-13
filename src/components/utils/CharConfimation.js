import { useLocation, useNavigate, useState } from "react-router-dom";
import { Character, CharData } from "components/TheCarousel";
import { duck_walk } from 'assets/chars/walk/walk_barrel';
import { toBeRequired } from "@testing-library/jest-dom/matchers";
import 'components/comstyles/charconfirmation.css';
import { duck_idle } from "assets/chars/idle/idle_barrel";
import Storage from "model/Storage";

export default function CharConfirmation() {
    const currentLoc = useLocation();
    let {state} = currentLoc;

   // const selectedChar = state?.selectedchar || new CharData('Benny', null, duck_idle, duck_walk, 4);
    const selectedChar = Storage.selectedCharacter;
    console.log(selectedChar);
    /*
    let benny = new CharData('Benny', null, null, duck_walk, 4)
    let { name, walk, id } = benny; */
    
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

    let nav = useNavigate();

    let handleNo = () => {
        nav('/charselect', { replace: true });
    }

    let handleYes = () => {
        nav('/main', { replace: true});
    }
    

    return(
        
        <div className="char-confirm">
            <h2> Are You Sure You want This </h2>
            <div className="text">
               <Character isCentered={true} ItemData={selectedChar} forConfirmation={toBeRequired}/>
               <div>
                    <p> {charStories[selectedChar.id]} </p>
                    <div>
                        <button onClick={handleYes}> I'm Sure </button>
                        <button onClick={handleNo}> No </button>
                    </div>
               </div>
            </div>
        </div>
    ) 
} 