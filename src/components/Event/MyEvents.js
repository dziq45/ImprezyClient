import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyEvent from './MyEvent'
import Ad from '../../components/Ads/Ad/Ad'
import * as actions from '../../store/actions/index'
import axios from 'axios'
import {apiCaller} from '../../apiCaller'

class MyEvents extends Component {
    state = {
        events: [],
    }
    
    componentDidMount() {
        apiCaller().get('event/getbycreator/' + this.props.userId)
            .then(response => {
                console.log(`Response: ${response.data}`)
                this.setState({ events: response.data })
                this.props.setMyEvents(response.data)
            })
            .catch(err=>{
                console.log(err)
            })
            console.log(this.state)
    }
    addEvent(){
        apiCaller().post("/event/add",{
            description:'Brak opisu',
            eventtype: null,
            address: null,
            creator:{
                personid:this.props.userId
            }
        })
        .then(response=>{
            console.log(response)
            this.componentDidMount()
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        const events = this.state.events.map(event => 
        <MyEvent id={event.eventid} description={event.description} address={event.address} eventType={event.eventtype}></MyEvent>)
            return (
                <div className="ads">
                    <div className="createBtn" onClick={()=>this.addEvent()}>Utwórz wydarzenie</div>
                    {events}
                </div>
            )
    }
}
const mapStateToProps = state => {
    console.log(state.auth)
    return {
      isAuthenticated: state.auth.token !== null,
      userType: state.auth.userType,
      userId: state.auth.userId
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
        setMyEvents: (events) => dispatch(actions.setMyEvents(events)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyEvents);