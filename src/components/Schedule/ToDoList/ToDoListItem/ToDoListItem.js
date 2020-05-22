import React, { Component } from 'react'
import { AiFillSafetyCertificate, AiOutlineClose, AiOutlineDown } from "react-icons/ai"

import './ToDoListItem.css'

class ToDoListItem extends Component {
    state = {
        showDetailsView: false,
        isDone: this.props.toDoListItemIsDone,
        content: this.props.toDoListItemContent,
        description: this.props.toDoListItemDescription,
        person: this.props.toDoListItemPerson
    }

    // showDetailsViewHandler = () => {
    //     this.setState({ showDetailsView: !this.state.showDetailsView })
    // }

    render() {
        return(
            <div className="to-do-list-item-box">
                <div className="to-do-list-item-is-done" style={{ display: 'inline-flex' }}>
                    {this.state.isDone
                        ? <AiFillSafetyCertificate onClick={e => this.setState({ isDone: !this.state.isDone }) }/>
                        : <AiOutlineClose onClick={e => this.setState({ isDone: !this.state.isDone }) }/>
                    }
                </div>
                <div style={{ width: '100%', float: 'left' }}>
                    <input className="to-do-list-item-content" 
                        type="text" 
                        value={this.state.content} 
                        onChange={e => this.setState({content: e.target.value})} 
                        disabled={this.props.disabled}/>
                    <input style={{ float: 'right' }} 
                        className="to-do-list-item-person" 
                        type="textarea" value={this.state.person} 
                        onChange={e => this.setState({person: e.target.value})} 
                        disabled={this.props.disabled}/>
                </div>
                <div>
                    <AiOutlineDown  style={{ margin: 'auto' }} onClick={e => this.setState({ showDetailsView: !this.state.showDetailsView })}/>
                </div>
                {
                    this.state.showDetailsView
                    ?   <input type="textarea" 
                            className="to-do-list-item-description" 
                            value={this.state.description} 
                            onChange={(e)=>this.setState({description: e.target.value})} 
                            disabled={this.props.disabled} />
                    :   null
                } 
            </div>
        )
    }
}

export default ToDoListItem