import { useEffect, useState } from "react";
import notebook from 'assets/uicom/Notebook.png';
import Cross from "./utils/cross";
import { useSound } from "./utils/SoundProvider";
import 'components/comstyles/diarystyles.css';
import Setting from "./utils/Settings";
import { useFeedback } from "./utils/FeedbackProvider";
import { useNavigate } from "react-router-dom";

export default function DiaryV2() {
    const [entries, updateE] = useState([""]);
    const [currentPage, updateCP] = useState(0);

    const {playSelect, playPageFlip} = useSound();

    const toRight = () => {
        playPageFlip();
        if(currentPage === entries.length - 1) updateE([...entries, '']);
        updateCP(currentPage + 1);
    }

    const toLeft = () => {
        playPageFlip();
        if(currentPage > 0) updateCP(currentPage - 1);
    }

    const {updateActPartook} = useFeedback();
    updateActPartook(3);


    const trackDiaries = E => {
        updateE(pre => {
            let copy = [...pre];
            copy[currentPage] = E.target.value;
            return copy;
        });

        E.target.value.length > 500 && toRight();
    }

    const [hasClickedSubmit, revertIfSubmited] = useState(false);

    const handleSubmit = () => {
        revertIfSubmited(true);
        playSelect();
    }

    let nav = useNavigate();
    const { updateFbVisibility } = useFeedback();

    const confirmSubmit = () => {
        playSelect();
        revertIfSubmited(false);
        updateFbVisibility(true);
        nav('/main', { replace: true });
    }

    let textAreaStyle = {
        lineHeight: 1.5, 
        fontSize: '1.2em', 
        resize: "none",
        background: "none",    
        padding: '0 .5em',
        width: '100%',
        height: '100%'
    }
    
    let [header, updateHeader] = useState('');
    const trackHeader = E => {
        updateHeader(E.target.value);
    }

    let [canSubmit, trackIfCan] = useState(false);
    useEffect(() => {
        trackIfCan(() => {
            let times = 0;
            for(let entry of entries) {
                entry.length == 0 && ++times;
            }
            console.log(header.length);
    
            return times <= 2 && header.length > 0;
        });
    }, [currentPage]);

    

    return (
        <div className="diaryWrapper">
            <Setting/>
            <div className="diary">
                <Cross size="50" top="10" left="450"/>
                <div className="head">
                    <input type="text" value={header} onChange={trackHeader} placeholder="What would be the title?"/>
                </div>
                <div className="entry">
                    <textarea
                    style={textAreaStyle}
                    value={entries[currentPage]}
                    onChange={trackDiaries}
                    placeholder="Write your diary here~"
                    />
                </div>
                <div className="buttons">
                    <button className="pre" onClick={toLeft} disabled={currentPage == 0}> Previous Page </button>
                    <button className="sum" onClick={handleSubmit} disabled={!canSubmit}> Submit </button>
                    <button onClick={toRight}> Next Page </button>
                </div>
                <div className="pn"> <h3> Page:{currentPage + 1} </h3> </div>
            </div>
            <ConfirmSubmit isVisible={hasClickedSubmit} toDo={confirmSubmit}/>

        </div>
            
        
    )
}

const ConfirmSubmit = ({isVisible, toDo}) => {
    return (
        <div className="memoryConfirm"
        style={{display: `${isVisible ? 'block' : 'none'}`}}>
            <h2> Your Memory was Wonderful~ </h2>
            <button onClick={toDo}> Okay </button>
        </div>
    )
}