import React from 'react'

import './Ad.css'

const ad = (props) => {
    return (
        <a href={props.eventId}>
            <div className="ad-box">
                <p>{props.eventType}</p>
                <p>{props.address}</p>
            </div>
        </a>
    )
}

export default ad