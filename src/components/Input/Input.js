import React from "react"

import './Input.css';

const input = (props) => {
    return (
        <div className ="input-div">
            <input 
            type="text" 
            placeholder={props.placeh} 
            className="input-bar" 
            onChange={props.changed} 
            onFocus={event => event.target.value = ''} 
            maxLength="50"
            />
            <button onClick={props.click} className="input-button">
                <ion-icon className="icon" name={props.icon}></ion-icon>
            </button>
        </div>
    )
}

export default input;