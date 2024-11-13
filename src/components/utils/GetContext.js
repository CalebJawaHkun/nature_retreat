import { createContext } from "react";
import { useState } from "react";
import Storage from "model/Storage";
const GameContext = createContext();

export default function GetContext({children}) {

    const [gamedata, updateData]  = useState(Storage.GameData);

    return(
        <GameContext.Provider value={{ gamedata, updateData }}>
            {children}
        </GameContext.Provider>
    );
}

export { GameContext };