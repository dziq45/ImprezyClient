import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyEvent from './MyEvent'
import Ad from '../../components/Ads/Ad/Ad'
import axios from 'axios'

class MyEvents extends Component {
    state = {
        events: [],
        userId : 1 // userID from store is undefined -.-
    }
    
    componentDidMount() {
        axios.get('event/getbycreator/' + this.state.userId)
            .then(response => {
                console.log(`Response: ${response.data}`)
                this.setState({ events: response.data })
            })
            .catch(err=>{
                console.log(err)
            })
            console.log(this.state)
    }
    
    render() {
    const events = this.state.events.map(event => 
    <MyEvent id={event.eventid} description={event.description} addressid={event.address}></MyEvent>)
        return (
            <div className="ads">
                {events}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
      isAuthenticated: state.auth.token !== null,
      userType: state.auth.userType,
      userId: state.userId
    }
  }
export default connect(mapStateToProps)(MyEvents);