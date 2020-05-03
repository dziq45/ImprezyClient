import React, {Component} from 'react'
import axios from 'axios'  
import {connect} from 'react-redux'
import './eventCss/Event.css'
import Colaboration from './Colaboration'
import Schedule from './Schedule'
import CostOrganizer from './CostOrganizer'
import Planning from './Planning'
import Publication from './Publication'
import EventForm from './EventForm'
class EventBoard extends Component{
    state={
        activeItem : 1
    }
    componentDidMount(){
        console.log(this.props.eventId)
    }
    renderProperItem(){
        switch(this.state.activeItem){
            case 0:
                return(<EventForm eventId={this.props.eventId}></EventForm>)
            case 1:
                return(<Schedule eventId={this.props.eventId}></Schedule>)
            case 2:
                return(<Planning eventId={this.props.eventId}></Planning>)
            case 3:
                return(<Colaboration eventId={this.props.eventId}></Colaboration>)
            case 4:
                return(<CostOrganizer eventId={this.props.eventId}></CostOrganizer>)
            case 5:
                return(<Publication eventId={this.props.eventId}></Publication>)
        }
    }
    render(){
        return(
            <div className="flex  mx-6">
                <div className="flex-2 border mx-2 bg-gray-200">
                    <ul>
                        <li>
                            <div className="boardOptionItem" onClick={()=>{this.setState({activeItem : 0})}}>
                                Ogólne
                            </div>
                        </li>
                        <li><div className="boardOptionItem" onClick={()=>{this.setState({activeItem : 1})}}>Harmonogram</div></li>
                        <li><div className="boardOptionItem" onClick={()=>{this.setState({activeItem : 2})}}>Planowanie</div></li>
                        <li><div className="boardOptionItem" onClick={()=>{this.setState({activeItem : 3})}}>Kolaboranci</div></li>
                        <li><div className="boardOptionItem" onClick={()=>{this.setState({activeItem : 4})}}>Kosztorys</div></li>
                        <li><div className="boardOptionItem" onClick={()=>{this.setState({activeItem : 5})}}>Publikacja</div></li>
                    </ul>
                </div>
                <div className="flex-1 bg-gray-200">
                    {this.renderProperItem()}
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