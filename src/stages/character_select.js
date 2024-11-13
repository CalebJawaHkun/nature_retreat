import TheCarousel from "components/TheCarousel";
import { GameContext } from "components/utils/GetContext";
import { useContext } from "react";
import Storage from "model/Storage";
export default function CharSelect() {


    console.log(Storage.GameData.passIntro);
    return (
        <TheCarousel/>
    );
}