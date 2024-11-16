import { useContext, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PopupFeedback from "./PopupFeedback";
import { useState } from "react";
const Feedback = createContext();
export default function FeedbackProvider({children}) {
    let isAtMainHub = useLocation().pathname == '/main';

    const [feedBackWindowIsVisible, updateFbVisibility] = useState(false);
    const [previousActPartook , updateActPartook] = useState(undefined);

    let sharedData = {
        feedBackWindowIsVisible, updateFbVisibility,
        previousActPartook, updateActPartook
    };

    useEffect(
        () => {
            console.log('FeedbackwindowIsVisible: ', feedBackWindowIsVisible);
            console.log('Previous Act Partook: ', previousActPartook);
            console.log('Is at Main Hub: ', isAtMainHub);
        }, [feedBackWindowIsVisible, previousActPartook]
    );

    

    return(
        <Feedback.Provider value={sharedData}>
            {children}
            {
                isAtMainHub && previousActPartook && feedBackWindowIsVisible &&
                (
                    <PopupFeedback 
                    whichActivity={previousActPartook}
                    isVisible={feedBackWindowIsVisible}
                    updateVisibility={updateFbVisibility}/>

                )
            }
        </Feedback.Provider>
    )
}

export const useFeedback = () => useContext(Feedback);