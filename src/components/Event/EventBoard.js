import React, {Component} from 'react'
import axios from 'axios'  
import {connect} from 'react-redux'
import './eventCss/Event.css'
import Colaboration from './Colaboration'
class EventBoard extends Component{
    state={
        activeItem : 1
    }
    componentDidMount(){
        console.log(this.props.eventId)
    }
    render(){
        return(
            <div className="flex  mx-6">
                <div className="flex-2 border mx-2 bg-gray-200">
                    <ul>
                        <li>
                            <div className="boardOptionItem">
                                Ogólne
                            </div>
                        </li>
                        <li><div className="boardOptionItem">Harmonogram</div></li>
                        <li><div className="boardOptionItem">Planowanie</div></li>
                        <li><div className="boardOptionItem">Kolaboranci</div></li>
                        <li><div className="boardOptionItem">Kosztorys</div></li>
                        <li><div className="boardOptionItem">Publikacja</div></li>
                    </ul>
                </div>
                <div className="flex-1 bg-gray-200">
                    <Colaboration></Colaboration>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        eventId : state.event.activeEventId
    }
}
export default connect(mapStateToProps)(EventBoard)