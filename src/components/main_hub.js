
function XY(x, y) {
    this.x = x;
    this.y = y;
}

export default function MainHub({chardata}) {
    // set the character up at 
    const [position, setPosition] = useState(new XY(100, 100));
    const [target, setTarget] = useState(new XY(0, 0));
    const [isMoving, setIsMoving] = useState(false);

    const mapBounds = {
        minX: 0, 
        maxX: 800,
        minY: 0, 
        maxY: 600
    };


    // when map is clicked
    const hanldeMapClick = E => {
        const rect = E.target.getBoundingClientRect();
        const clickX = Math.floor(E.clientX - rect.left);
        const clickY = Math.floor(E.clientY - rect.top);

        let clickedLoc = new XY(clickX, clickY);
        setTarget(clickedLoc);
        console.log(clickedLoc);
        setIsMoving(true);
    };

    // moving the character to the target
    useEffect(() => {
        if(isMoving && target) {
            const interval = setInterval(() => {
                // the position is set every 50ms
                setPosition(prev => {
                    // delta refers to the differece in position which needed 
                    // to be covered by the character.
                    const deltaX = target.x - prev.x;
                    const deltaY = target.y - prev.y;

                    let newX = prev.x;
                    let newY = prev.y;

                    newX = prev.x + Math.sign(deltaX) * 10;
                    newY = prev.y + Math.sign(deltaY) * 10;
                    // determining xy step unit. currently its set to 10 units.
                    if(deltaX !== 0) {
                        
                    } else if(deltaY !== 0) {
                       
                    }

                    // constraint XY between map boundary
                    newX = Math.max(mapBounds.minX, Math.min(mapBounds.maxX, newX));
                    newY = Math.max(mapBounds.minY, Math.min(mapBounds.maxY, newY));

                    // if the character finally moved to the target
                    if(newX === target.x && newY === target.y) {
                        setIsMoving(false);
                        return new XY(newX, newY);
                    }


                    return new XY(newX, newY);

                });

            }, 50);

            return () => clearInterval(interval);
        }
    },[target, isMoving]);


    return(
        <>
        <div 
        className="themainhub"
        onClick={hanldeMapClick}
        style={{
            position: 'relative',
            width: '1080px',
            height: '800px',
            background: 'black',
            overflow: 'hidden',
            border: '1px solid black',
            margin: '2in auto'
        }}>
            <Animator fps={5}
            sprite={isMoving ? duck_walk : duck_idle}
            style={{
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                width: `50px`,
                height: '50px'
                
            }}/>
        </div>
        <h2> is moving: {''+isMoving} </h2>
        <h2> Character Position: x:{position.x}y:{position.y} </h2>
        <h2> Clicked Position: x:{target.x}y:{target.y} </h2>
        </>
    )
}