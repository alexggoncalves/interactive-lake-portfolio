import useTouchInput from '../stores/useTouchInput'

export default function TouchControls(props) {
    const toggleForward = useTouchInput((state)=>state.toggleForward)
    const toggleBackward = useTouchInput((state)=>state.toggleBackward)
    const toggleLeftward = useTouchInput((state)=>state.toggleLeftward)
    const toggleRightward = useTouchInput((state)=>state.toggleRightward)

    return (
        <div className="touch-controls">
            <div className="buttons">
                <div onPointerDown={toggleLeftward} onPointerLeave={toggleLeftward}>{'<'}</div>
                <div onPointerDown={toggleRightward} onPointerLeave={toggleRightward}>{'>'}</div>
            </div>
            <div className="buttons right">
                <div onPointerDown={toggleForward} onPointerLeave={toggleForward}>ʌ</div>
                <div onPointerDown={toggleBackward} onPointerLeave={toggleBackward}>v</div>
            </div>
        </div>
    );
}
