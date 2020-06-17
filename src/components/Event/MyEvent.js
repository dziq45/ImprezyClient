import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import './eventCss/Event.css'
import {apiCaller} from '../../apiCaller'
import { TiDeleteOutline } from "react-icons/ti";


const MyEvent = (props) => {

    return (
        <div className="eventBox">
            {console.log(`Eventy: ${props.myEvents}`)}
            <Link onClick={()=>props.setActiveEventId(props.id)} to ={"/Event/" + props.id}>
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
            </Link>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        myEvents:state.event.myEvents,
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setActiveEventId: (eventId) => dispatch(actions.setActiveEventId(eventId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(MyEvent)