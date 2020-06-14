import React, {Component, useEffect} from 'react';
import './eventCss/Event.css'

const ScheduleItem = (props) =>{


    return(
        <div className="card">
            <p>
            <input className="bg-transparent w-5" value={props.hour}></input>: 
            <input className="bg-transparent w-5" value={props.minute}></input><span className="pl-4"></span>
            </p>
            <p className="descriptionWrap">
            <input className="bg-transparent" value={props.description}></input>
            </p>
        </div>
    )
}
export default ScheduleItem