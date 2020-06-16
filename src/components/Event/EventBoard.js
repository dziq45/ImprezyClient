import React, {Component} from 'react'
import axios from 'axios'  
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import './eventCss/Event.css'
import Colaboration from './Colaboration'
import Schedule from './Schedule'
import CostOrganizer from './CostOrganizer'
import Planning from './Planning'
import Publication from './Publication'
import EventForm from './EventForm'
import {apiCaller} from '../../apiCaller'
class EventBoard extends Component{
    state={
        activeItem : 1
    }
    componentDidMount(){
        console.log(this.props.eventId)
        //check if there is todolist
        //and add new if there isn't
        this.fetchEventData()
        this.props.setCollaborators(this.props.eventId)

    }
    fetchEventData(){
        //toDoList
        apiCaller().get('/todolist/getbyevent/' + this.props.eventId)
        .then(res=>{
            console.log(res.data)
            if(res.data.length === 0){
                console.log(`dodaje liste event ${this.props.eventId}`)
                apiCaller().post('/todolist/add',{
                    event:{
                        eventid:this.props.eventId
                    },
                    title:"standard"
                })
                .then(res2=>{
                    console.log(res2.data)
                    console.log('Dodana lista')
                    this.props.setToDoListId(res2.data.todolistid)
                })
            }
            else{
                console.log('Dodana lista - juz byla')
                console.log(res.data)
                this.props.setToDoListId(res.data[0].todolistid)
            }
        })
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
            <div>
                <div className="option-bar-section">
                    <ul className="option-bar">
                        <li><div className={this.state.activeItem == 0? "boardOptionItemSelected": "boardOptionItem"} onClick={()=>{this.setState({activeItem : 0})}}>Ogólne</div></li>
                        <li><div className={this.state.activeItem == 1? "boardOptionItemSelected": "boardOptionItem"} onClick={()=>{this.setState({activeItem : 1})}}>Harmonogram</div></li>
                        <li><div className={this.state.activeItem == 2? "boardOptionItemSelected": "boardOptionItem"} onClick={()=>{this.setState({activeItem : 2})}}>Planowanie</div></li>
                        <li><div className={this.state.activeItem == 3? "boardOptionItemSelected": "boardOptionItem"} onClick={()=>{this.setState({activeItem : 3})}}>Kolaboranci</div></li>
                        <li><div className={this.state.activeItem == 4? "boardOptionItemSelected": "boardOptionItem"} onClick={()=>{this.setState({activeItem : 4})}}>Kosztorys</div></li>
                        <li><div className={this.state.activeItem == 5? "boardOptionItemSelected": "boardOptionItem"} onClick={()=>{this.setState({activeItem : 5})}}>Publikacja</div></li>
                        
                    </ul>
                </div>
                <div className="main-content">
                    {this.renderProperItem()}
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        eventId : state.event.activeEventId,
        toDoListId : state.event.toDoListId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setToDoListId: (id) => dispatch(actions.setToDoListId(id)),
        setCollaborators: (eventId) => dispatch(actions.setCollaborators(eventId))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EventBoard)