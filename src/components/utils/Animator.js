import { useState, useEffect } from "react";


function Animator({fps = 5, sprite, style}) {
    let sprite_ = Object.values(sprite);
    
    let [currentFrame, update] = useState(0);
    const totalFrames = sprite_.length;

    useEffect(
        () => {
            const interval = 1000 / fps;
            const animationInterval = setInterval(
                () => {
                    update(prev => (prev + 1) % totalFrames);
                },
                interval
            );

            return () => clearInterval(animationInterval);
        },
        [fps, totalFrames]
    );

    return (
        <img
        src={sprite_[currentFrame]}
        style={style}/>
    )
}

function AnimateOnce({ fps = 5, sprite, style }) {
    let sprite_ = Object.values(sprite);
    const [currentFrame, setCurrentFrame] = useState(0);
    const totalFrames = sprite_.length;

    useEffect(() => {
        if (currentFrame >= totalFrames - 1) return; // Stop updating at the last frame

        const interval = 1000 / fps;
        const animationInterval = setInterval(() => {
            setCurrentFrame(prev => prev + 1);
        }, interval);

        return () => clearInterval(animationInterval);
    }, [fps, currentFrame, totalFrames]);

    return (
        <img
            src={sprite_[currentFrame]}
            style={style}
        />
    );
}


export { AnimateOnce };
export default Animator;