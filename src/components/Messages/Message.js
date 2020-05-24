import React, { Component } from 'react';
import {connect} from 'react-redux'
import MessageForm from './MessageForm'





class Message extends Component{

    constructor(props) {
        super(props);
        this.state = {
          showForm: false,
        };
        this.showMessageForm = this.showMessageForm.bind(this);
        this.hideMessageForm = this.hideMessageForm.bind(this);
      }
    showMessageForm() {
        this.setState({
          showForm: true,
        });
      }
    hideMessageForm() {
        this.setState({
          showForm: false,
        });
      }
    render() {
        return(
            <div className="m-auto w-4/5 bg-gray-300 border-b-2 border-gray-600">
                <div className="flex p-2">
                    <div className="w-3/4">
                        <p>{this.props.senton.substring(0,10) +' '+this.props.senton.substring(11,19)}</p>
                        <p className="font-bold">{this.props.subject}</p>
                        <p className="bold">{this.props.body}</p>
                    </div>
                    
                    <div className="float-right" onClick={() => this.showMessageForm()}>
                        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Odpowiedz
                        </div>
                    </div>
                </div>
                <div>
                    {this.state.showForm ?
                        <MessageForm hide = {this.hideMessageForm} receiverid={this.props.sender} senderid={this.props.receiver}></MessageForm>:
                        null
                    }
                </div>
            
        
            </div>
        )
    }
}












const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps
    }
}



export default connect(mapStateToProps)(Message)