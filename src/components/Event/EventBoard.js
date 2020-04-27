import React, {Component} from 'react'
import axios from 'axios'  
import {connect} from 'react-redux'
class EventBoard extends Component{
    state={

    }
    componentDidMount(){
        console.log(this.props.eventId)
    }
    render(){
        return(
            <div>
                pusto
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