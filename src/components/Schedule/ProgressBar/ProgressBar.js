import React from 'react'

import './ProgressBar.css'

import Filler from './Filler/Filler'

const ProgressBar = (props) => {
    return(
        <div className="progress-bar">
            <Filler percentage={props.percentage} background={props.background}/>
        </div>
    )
}

export default ProgressBar