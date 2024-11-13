import { useNavigate } from "react-router-dom";
import {GameContext} from "components/utils/GetContext";
import { useContext } from "react";
import LakeVid from 'assets/bg/dynamic/SunsetLake_LW.mp4';
import Storage from "model/Storage";
export default function Intro() {
    let nav = useNavigate();

    const myStyles = 
    `
        .home {
            font-size: 1.3rem;
            width: 900px;
            padding: 1em;
            height: 300px;
            text-align: center;
            position: relative;
            top: 2.5in;
            margin: auto;
            color: white;
            cursor: pointer;
        }

        span {
            background-color: black;
            display: inline-block;
            border-radius: .3em;
            padding: .1em;
        }

        @keyframes bliping {
            0% {
                opacity: 1;
            }

            30% {
                opacity: .5;
            }

            50% {
                opacity: .0;
            }

            75% {
                opacity: .5;
            }

            100% {
                opacity: 1;
            }
        }

        .start {
            //background-color: initial;
            animation-name: bliping;
            animation-duration: 1.5s;
            animation-iteration-count: infinite;
            animation-delay: .2s;
            animation-timing-function: linear;
        }

        #intro_bg {
            width: 100vw;
            position: fixed;
        }
    `;

    let handleNav = () => {
       
        Storage.didPassIntro();
        nav('/charselect', { replace: true });
    };

    console.log(Storage.GameData.passIntro);
    return (
        <>
            <style>{myStyles}</style>
            <video id="intro_bg" autoPlay loop muted >
                <source src={LakeVid} type="video/mp4"/>
            </video>
            <div className="home" onClick={handleNav}>
                <h1> <span> Welcome to Serenity </span> </h1>
                <p> 
                    <span>
                        Take a deep breath, relax, and get ready to explore a world designed just for you. 
                        In this nature retreat, each path you choose leads to a new activity to help ease your mind and lift your spirit.
                        Let's begin your path to relaxation. Click Start to Continue~ 
                    </span>
                </p>
                <span className="start"> Click to Start </span>
            </div>
            
        </>

    );
}