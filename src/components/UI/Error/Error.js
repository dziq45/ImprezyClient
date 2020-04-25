import React from 'react'

import './Error.css'

const error = (props) => {
    return ( 
        <div className="error-box">
            <p>{props.message}</p>
        </div>
    )    
}

export default error