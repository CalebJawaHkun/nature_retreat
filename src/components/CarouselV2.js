import { useRef, useState, useEffect } from "react";

const styles = 
`
    .bg, .container, .carousel {
        border: 1px solid black;
    }
    
    .bg {
        position: relative;
        top: 2in;
        //background: grey;
        //backdrop-filter: blur(10px);
        padding: .5in 0;
    }

    .container {
        max-width: 800px;
        margin: auto;
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
    }

    .carousel {
        width: 510px;
        display: flex;
        overflow-x: hidden;
        //scroll-behavior: smooth;
    }

    .chosen {
        transform: scale(1.08);
        transform-origin: 50% 70%;
    }
`;

export default function CarouselV2() {
    let [itemsUI, updateItemsUI] = useState(['A', 'B', 'C', 'D', 'E']);
    let [itemsORI] = useState(['A', 'B', 'C', 'D', 'E']);

    let [centeredItem, updateCT] = useState(1);
    const carousel = useRef();

    const toLeft = () => {
        updateCT(
            pre => pre > 0 ? --pre : itemsORI.length - 1
        );

        updateItemsUI(
            pre => [pre[pre.length - 1], ...pre.slice(0, 4)]
        );

    };

    const toRight = () => {
        updateCT(
            pre => (pre + 1) % itemsORI.length
        );

        updateItemsUI(
            pre => [...pre.slice(1), pre[0]]
        );
    };

    return(
        <>
            <style> {styles} </style>
            <div className="bg">
                <div className="container">
                    <button onClick={toLeft}> Left </button>

                    <div class="carousel" ref={carousel}>
                        {
                            itemsUI.map(
                                (value, key) => 
                                    <Div key={key}
                                    classs={itemsORI[centeredItem] === value ? 'chosen' : ''}> {value} </Div>
                            )
                        }

                    </div>

                    <button onClick={toRight}> Right </button>
                </div>
                <button> Select </button>
            </div>
            <h3> CT: {centeredItem} </h3>
        </>
    )
    
}

const Div = ({children, classs}) => 
    <div
    className={classs}
    style={{
        width: '150px',
        height: '200px',
        border: '2px dotted black',
        flexShrink: 0,
        margin: '.5em',
        transition: 'transform .2s ease-out'
    }}>
        {children}
    </div>