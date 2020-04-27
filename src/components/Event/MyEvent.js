import React from 'react'


const Event = (props) => {
    return (
        <a href={props.eventId}>
            <div className="ad-box">
                <p>{props.description}</p>
                <p>{props.id}</p>
            </div>
        </a>
    )
}

export default Event