import React from 'react';
import {connect} from 'react-redux'
import MessageForm from './MessageForm'


const Message = (props) => {

   




    
    return (
        <div className="m-auto w-4/5 " >
            <div className="flex mb-4">
                <div className="w-3/4">
                    {props.senton}
                    {props.subject}
                </div>
                {props.body}
                <div className="w-1/4" onClick={()=>renderMessageForm(props)}>
                    <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Odpowiedz
                    </div>
                </div>
            </div>
            <div>
            <MessageForm receiverid={props.sender} senderid={props.receiver}></MessageForm>
            </div>
           
       
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}

const renderMessageForm = (props) => {
    
    return (
        <div>
        
        </div>
    )
}

export default connect(mapStateToProps)(Message)