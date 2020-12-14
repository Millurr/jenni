import React from 'react'

export default function SuccessNotice(props) {
    return (
        <div className="success-notice">
            <span>{props.message}</span>
            <button onClick={props.clearMessage}>X</button>
        </div>
    )
}
