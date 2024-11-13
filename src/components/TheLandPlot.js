import { rose, dahlia, peony, orchid, salvia } from "assets/uicom/flowers/static_seeds";
import { useState, useEffect } from "react";
import * as DahliaSprite from 'assets/uicom/flowers/dahlia/dahlia_barrrel';
import * as OrchidSprite from 'assets/uicom/flowers/orchid/orchid_barrel';
import * as PeonySprite from 'assets/uicom/flowers/peony/peony_barrel';
import * as RoseSprite from 'assets/uicom/flowers/rose/rose_barrel';
import * as SalviaSprite from 'assets/uicom/flowers/salvia/salvia_barrel';
import { XY } from "model/Storage";
import { AnimateOnce } from "./utils/Animator";
import Cross from "./utils/cross";

import 'components/comstyles/landplot.css';

function Seed(id, name, url, sprite) {
    this.id = id;
    this.name = name;
    this.url = url;
    this.sprite = sprite;
    this.isPlanted = false;
    this.memory = '';
}

const SeedUI = ({seed_data, seedSelect = undefined}) => {
    const { name, url, isPlanted, sprite, memory } = seed_data;

    const imgStyle = {
        imageRendering: 'pixelated',
        width: '80px'
    };

    return (
        <div className={`seed_ui ${isPlanted ? 'planted' : ''}`} onClick={seedSelect ? () => seedSelect(seed_data) : null}>
            {
                isPlanted ? (
                        <>
                            <AnimateOnce sprite={sprite} style={imgStyle} />
                            <h4> {memory} </h4>
                        </>
                    )
                    :
                    (
                        <>
                            <img src={url} style={imgStyle} title={name} />
                            <h4> {name} </h4>
                        </>
                    )
                    
            }
        </div>
    );
};

const SeedSelector = ({ onSelectedSeed, seeds }) => {
    const allSeedsPlanted = () => seeds.filter(seed => seed.isPlanted).length == seeds.length - 1 ? 'Select Your Seeds' : 'All Seeds Planted~';

    return (
        <div className="seed-selector">
        <h3>{`Select Your Seeds`}</h3>
        {seeds.filter(seed => !seed.isPlanted).map((seed, key) =>
            <SeedUI key={key} seed_data={seed} seedSelect={onSelectedSeed} />
        )}
    </div>
    );
}

const MemoryConfirmation = ({ updatePlantingStatus, updateSelectedSeed, isVisible, setMemCollected }) => {
    const [currentInput, update] = useState('');

    const handleConfirm = () => {
        

        updateSelectedSeed(prevSeeds => {
                let copy = JSON.parse(JSON.stringify(prevSeeds));
                copy.memory = currentInput;
                console.log('Updated Memory: ', copy);
                return copy;
            }
        );

        updatePlantingStatus(false);
        setMemCollected(true);
        console.log('Input Message: ', currentInput);
    };

    const handleCancel = () => {
        updatePlantingStatus(false);
    };

    const myStyle = `
        .memoryconfirm {
            display: ${isVisible ? 'block' : 'none'};
            position: absolute;
            top: 3.5in;
            left: 7.2in;
            margin: 0 auto;
            padding: 1em;
            border-radius: .5em;
            background-color: #6fc276;
            width: 500px;
        }
        .memoryconfirm button { font-size: 1.3em; margin-right: .5em; }
        .memoryconfirm h2 { margin-top: 0; font-size: 1.5em; text-align: center; }
        .memoryconfirm input {
            width: 100%;
            font-size: 1.3em;
            padding: .4em;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            border-radius: .3em;
        }
        .inputfield > div { margin: .5em 0; }
    `;

    return (
        <>
            <style>{myStyle}</style>
            <div className="memoryconfirm">
                <h2>What are you grateful for?</h2>
                <div className="inputfield">
                    <input
                        type="text"
                        placeholder="Write your memory here!"
                        value={currentInput}
                        onChange={e => update(e.target.value)}
                    />
                    <div>
                        <button onClick={handleConfirm} disabled={currentInput.length === 0}>Confirm</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </>
    );
};

const LandPlot = ({ plot, onPlantSeed }) => (
    <div className="land-plot">
        <div className="table">
            {plot.map((row, x) =>
                <div className="row" key={x}>
                    {row.map((cell, y) =>
                        <div
                            className="cell"
                            key={`${x}-${y}`}
                            onClick={() => onPlantSeed(x, y)}
                        >
                            {cell ? cell : ''}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
);

export default function Gardening() {
    const [selectedSeed, setSS] = useState(null);
    const [plot, setPlot] = useState(Array.from({ length: 6 }, () => Array(6).fill(null)));
    const [cursorPosition, setCursorPosition] = useState(new XY(0, 0));
    const [isSeedFollowing, setSeedFollowing] = useState(false);
    const [boutToBePlanted, revertBTB] = useState(false);

    const [clickedCell, updateClickedcell] = useState(null);
    const [memoryCollected, updateMemoryCollected] = useState(false);

    const [seeds, setSeeds] = useState([
        new Seed(0, 'Rose', rose, RoseSprite),
        new Seed(1, 'Dahlia', dahlia, DahliaSprite),
        new Seed(2, 'Peony', peony, PeonySprite),
        new Seed(3, 'Orchid', orchid, OrchidSprite),
        new Seed(4, 'Salvia', salvia, SalviaSprite)
    ]);

    const handleSelectSeed = seed => {
        setSS(seed);
        setSeedFollowing(true);
    };

    const handleSeedPlanting = (x, y) => {
        if (selectedSeed && !plot[x][y]) {
            revertBTB(true);  // Trigger MemoryConfirmation
            updateClickedcell(new XY(x, y));
        }
        
        setSeedFollowing(false);
    };



    useEffect(() => {

        
        if (memoryCollected) {

            console.log('Planted at: ', clickedCell);
            console.log('Selected Seed: ', selectedSeed);

            setSeeds(prevSeeds => 
                prevSeeds.map(seed =>
                    seed.id === selectedSeed.id ? { ...seed, isPlanted: true, memory: selectedSeed.memory } : seed
                )
            );

            // Update the plot with the new planted seed in the specific cell
            setPlot(prev =>
                prev.map((row, rowIndex) =>
                    row.map((cell, colIndex) =>
                        rowIndex === clickedCell.x && colIndex === clickedCell.y
                            ? <SeedUI key={selectedSeed.id} seed_data={{ ...selectedSeed, isPlanted: true }} />
                            : cell
                    )
                )
            );

            setSS(null);
            updateMemoryCollected(false);
        }
    }, [memoryCollected]);
    

    useEffect(() => {
        // Define the event handlers here to avoid stale closures
        const handleMouseMove = e => {
            setCursorPosition(new XY(e.clientX, e.clientY));
        };
    
        const handleRightClick = e => {
            e.preventDefault();
            setSS(null);
            setSeedFollowing(false);
        };
    
        if (selectedSeed && isSeedFollowing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('contextmenu', handleRightClick);
        }
    
        // Cleanup function to remove event listeners
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('contextmenu', handleRightClick);
        };
    }, [selectedSeed, isSeedFollowing]);
    

    return (
        <div className="garden_wrapper">
            <h2> Memory Record </h2>
            <div className="gardening">
                <Cross top="70" left="1450"/>
                <SeedSelector onSelectedSeed={handleSelectSeed} seeds={seeds} />
                <LandPlot plot={plot} onPlantSeed={handleSeedPlanting} />
                

                {
                    boutToBePlanted && (
                        <MemoryConfirmation
                            isVisible={boutToBePlanted}
                            updatePlantingStatus={revertBTB}
                            selectedSeed={selectedSeed}
                            updateSelectedSeed={setSS}
                            setMemCollected={updateMemoryCollected}
                        />
                    )
                }
                
                {isSeedFollowing && selectedSeed && (
                    <img
                        src={selectedSeed.url}
                        style={{
                            position: 'absolute',
                            left: cursorPosition.x + 5,
                            top: cursorPosition.y + 5,
                            width: '80px',
                            imageRendering: 'pixelated',
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </div>

        </div>
    );
}
