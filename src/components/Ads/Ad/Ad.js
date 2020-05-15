import React from 'react'

import './Ad.css'

const ad = (props) => {
    return (
        <a href={props.eventId}>
            <div className="ad-box">
                <div className="inline-block mx-12">
                    <p><b>{props.eventType}</b></p>
                    <p>{props.description}</p>
                </div>
                <div className="inline-block mx-12">
                    {props.address !== null ? <div>
                        <p>{props.address.city}</p>
                        <p>{props.address.street} {props.address.number}</p>
                        </div>: null}
                </div>
            </div>
        </a>
    )
}

export default ad