import { Route, Routes, useLocation } from "react-router-dom";
import {Intro, CharSelect} from "stages/stages_barrel";
import ProtectedRoute from "./ProtectedRoute";
import Mainhub from "components/TheMainhub";
import CharConfirmation from "components/utils/CharConfimation";
import DiaryV2 from "components/TheDiary";
import Gardening from "components/TheLandPlot";
import Meditation from "components/TheMeditation";
import BreathingExercise from "components/TheBreathingExercise";


export default function GetElement() {

    let charIsSelected = localStorage.getItem('charselected');
    let selectedchar = localStorage.getItem('selectedchar'); 
    let currentloc = useLocation().pathname;

    console.log('Char is Selected: ', charIsSelected);
    console.log('Selected Character: ', JSON.parse(selectedchar));


    let isBeforeMainHub = [
        '/charselect', '/', '/charconfirm'
    ].includes(currentloc);

    let isAtAct = [
        '/act_diary', '/act_garden', '/act_med', '/act_breath'
    ].includes(currentloc);
    
    console.log('Is Before Main Hub: ', isBeforeMainHub);
    console.log('Is At Act: ', isAtAct);

    return(
        <Routes>
            <Route
            element={
                <ProtectedRoute
                isAllowed={!charIsSelected}
                redirectPath={'/main'}>
                    <Intro/>
                </ProtectedRoute>
            } path={"/"}/>
            <Route element={
                <ProtectedRoute
                isAllowed={!charIsSelected}
                redirectPath={'/main'}>
                    <CharSelect/>
                </ProtectedRoute>
            } path={'/charselect'}/>
            <Route element={
                <ProtectedRoute
                isAllowed={!charIsSelected}
                redirectPath={'/main'}>
                    <CharConfirmation/>
                </ProtectedRoute>
            } path={"/charconfirm"}/>
            <Route element={
                <DiaryV2/>
            } path={"/act_diary"}/>
            <Route element={
                <Gardening/>
            } path={"/act_garden"}/>
            <Route element={
                
                <ProtectedRoute
                isAllowed={(charIsSelected && !isBeforeMainHub)}
                redirectPath={'/charselect'}>
                    <Mainhub/>
                </ProtectedRoute>
            } path={"/main"}/>
            <Route element={
                <Meditation/>
            } path={"/act_med"}/>
            <Route element={
                <BreathingExercise/>
            } path={"/act_breath"}/>
        </Routes>
    )
}