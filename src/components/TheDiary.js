import { useEffect, useState } from "react";
import notebook from 'assets/uicom/Notebook.png';
import Cross from "./utils/cross";
let DiaryStyle = 
`

    .diary {
        position: relative;
        top: 1in;
        margin: auto;
        background-image: url(${notebook});
        background-repeat: no-repeat;
        background-origin: border-box;
        background-position: 55% 70%;
        background-size: 175%;
        height: 720px;
        width: 450px;
    }

    .buttons, .entry, .head, .pn {
        position: absolute;
    }

    .buttons {
        height: 1.8em;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .buttons button {
        font-size: inherit;
        background: black;
        border-radius: .4em;
        color: white;
    }

    .entry {
        left: 65px;
        top: .75in;
        width: 83%;
        height: 75%;
    }

    .head {
        top: 10px;
        left: 65px;
        width: 83%;
    }

    .pn {
        bottom: 40px;
        right: 20px;
    }

    .diary input {
        background: none;
        border: none;
        height: 2.2em;
        font-size: 1.6em;
        width: 100%;
        padding: 0 .4em;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    textarea {
        border: none;
    }

    input:focus, textarea:focus, textarea {
        outline: none;
    }

    .pre:disabled, .sum:disabled {
        opacity: .5;
    }
`;
export default function DiaryV2() {
    const [entries, updateE] = useState([""]);
    const [currentPage, updateCP] = useState(0);

    const toRight = () => {
        if(currentPage === entries.length - 1) updateE([...entries, '']);
        updateCP(currentPage + 1);
    }

    const toLeft = () => {
        if(currentPage > 0) updateCP(currentPage - 1);
    }


    const trackDiaries = E => {
        updateE(pre => {
            let copy = [...pre];
            copy[currentPage] = E.target.value;
            return copy;
        });

        E.target.value.length > 500 && toRight();
    }

    const handleSubmit = () => {
        console.log(entries);
        alert('submited~');
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
        <>
            <style> {DiaryStyle} </style>
            <Cross size="50" top="100" left="1180"/>
            <div className="diary">
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
        </>
        
    )
}