import React, {Component} from 'react';

const ScheduleItem = (props) =>{

    return(
        <div>
            <input className="bg-transparent w-5" value={props.hour}></input>: 
            <input className="bg-transparent w-5" value={props.minute}></input><span className="pl-4"></span>
            <input className="bg-transparent" value={props.description}></input>

        </div>
    )
}
export default ScheduleItem