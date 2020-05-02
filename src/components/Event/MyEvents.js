import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyEvent from './MyEvent'
import Ad from '../../components/Ads/Ad/Ad'
import axios from 'axios'

class MyEvents extends Component {
    state = {
        events: [],
    }
    
    componentDidMount() {
        axios.get('event/getbycreator/' + this.props.userId)
            .then(response => {
                console.log(`Response: ${response.data}`)
                this.setState({ events: response.data })
            })
            .catch(err=>{
                console.log(err)
            })
            console.log(this.state)
    }
    addEvent(){
        axios.post("/event/add",{
            description:'Brak opisu',
            eventtype: null,
            address: null,
            creator:{
                personid:this.props.userId
            }
        })
        .then(response=>{
            console.log(response)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render() {
        const events = this.state.events.map(event => 
        <MyEvent id={event.eventid} description={event.description} addressid={event.address}></MyEvent>)
            return (
                <div className="ads">
                    <div className="border border-black" onClick={()=>this.addEvent()}>Utwórz wydarzenie</div>
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
export default connect(mapStateToProps)(MyEvents);