import { Route, Routes } from "react-router-dom";
import {Intro, CharSelect} from "stages/stages_barrel";
import ProtectedRoute from "./ProtectedRoute";
import { useContext } from "react";
import { GameContext } from "components/utils/GetContext";
import Main_Hub from "components/main_hubv2";
import CharConfirmation from "components/utils/CharConfimation";
import DiaryV2 from "components/TheDiary";
import Gardening from "components/TheLandPlot";


import { useState } from "react";

import Storage from "model/Storage";

export default function GetElement() {

    let [GData, update] = useState(Storage.GameData);

    return(
        <Routes>
            <Route
            element={
                <Intro/>
            } path={"/"}/>
            <Route element={
                <CharSelect/>
            } path={'/charselect'}/>
            <Route element={
                <CharConfirmation/>
            } path={"/charconfirm"}/>
            <Route element={
                <DiaryV2/>
            } path={"/act_diary"}/>
            <Route element={
                <Gardening/>
            } path={"/act_garden"}/>
            <Route element={
                <Main_Hub/>
            } path={"/main"}/>
        </Routes>
    )
}