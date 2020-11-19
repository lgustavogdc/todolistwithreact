import React from "react"

import './Task.css';

const task = (props) => {
    return (
        <div className ="task">
            <p className="task-name">{props.taskName}</p>
            <div className="task-button-div">
                <button onClick={props.finish} className="finish-button"><ion-icon name="checkmark-outline"></ion-icon></button>
                <button onClick={props.edit} className="edit-button"><ion-icon name="pencil-outline"></ion-icon></button>
                <button onClick={props.finish} className="delete-button"><ion-icon name="close-outline"></ion-icon></button>
            </div>
        </div>
    )
}

export default task;