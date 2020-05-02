import React, {Component} from 'react';

const ScheduleItem = (props) =>{

    return(
        <div>
            <p>{props.hour} : {props.minute}   {props.description}</p>
        </div>
    )
}
export default ScheduleItem