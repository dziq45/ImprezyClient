import React from 'react'

const ad = (props) => {
    return (
        <div className="ad-box">
            <p>{props.eventType}</p>
            <p>{props.address}</p>
        </div>
    )
}

export default ad