import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios'
import {apiCaller} from '../../apiCaller'
import Message from './Message'

class Messages extends Component{
    state={
        messages : [],
    }
    componentDidMount() {
        apiCaller().get('message/getreceived/' + this.props.userId)
            .then(response => {
                console.log(`Response: ${response.data}`)
                this.setState({ messages: response.data })

            })
            .catch(err=>{
                console.log(err)
            })
           
    }
    render(){
       
        const messages = this.state.messages.map(message => 
            <Message id={message.messageid} sender={message.sender.personid} receiver={message.receiver.personid} subject={message.subject} body={message.body} senton ={message.senton}></Message>)
                return (
                    <div>
                        
                        {messages}
                    </div>
                )
    }
}

const mapStateToProps = state => {
    
    return {
      isAuthenticated: state.auth.token !== null,
      userId: state.auth.userId
    }
}
export default connect(mapStateToProps)(Messages)