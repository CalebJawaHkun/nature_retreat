import { useState, useRef } from "react";
const styles = 
`
    .carousel-container, .carousel {
        border: 1px solid black;
    }

    .carousel-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: ralative;
        max-width: 1080px;
        overflow:  hiddden;
        margin: 3in auto;
    }

    .carousel {
        display: flex;
        overflow: hidden;
        scroll-behavior: smooth;
        flex: 0 0 200px;
    }

    .carousel > * {
        flex-shrink: 0;
    }


`;


export default function Carousel({item}) {
    const theCarousel = useRef();


    const scrollLeft = () => {
        if(theCarousel.current) {
            theCarousel.current.scrollBy({
                left: -205,
                behavior: 'smooth'
            })
        }
    };

    const scrollRight = () => {
        if(theCarousel.current) {
            theCarousel.current.scrollBy({
                left: 205,
                behavior: 'smooth'
            })
        }
    };

    return (
        <div className="carousel-container">
            <style>{styles}</style> 
            <button 
            onClick={scrollLeft} 
            className="carousel-bth left"> Left </button>

            <div className="carousel" ref={theCarousel}>
                <Div> One </Div>
                <Div> Two </Div>
                <Div> Three </Div>
                <Div> Four </Div>
            </div>

            <button 
            onClick={scrollRight} 
            className="carousel-bth left"> Right </button>
        </div>
    )

}


const Div = ({children}) =>
    <div style={{
        border: '1px solid black',
        width: '200px',
        height: '400px',
        backgroundColor: 'black',
        color: 'white'
    }}>
        {children}
    </div>;