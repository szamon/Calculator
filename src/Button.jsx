import React from 'react';

const Button = (props) => {
    return<div id={props.id} className={props.className} onClick={props.onClick} text={props.text}>{props.text}</div>
}
export default Button;