import React from 'react';

const Display = (props) => {
    return <div id="displayContainer" className="displayContainer">
        <div className="prevDisplay"><div className="inPrevDisplay">{props.prevDisplay}</div></div>
        <div className="currDisplay" id="display">{props.currDisplay}</div>
    </div>
}

export default Display;