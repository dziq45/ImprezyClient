import React, { Component } from 'react'
import { AiFillSafetyCertificate, AiOutlineClose, AiOutlineDown } from "react-icons/ai"

import './ToDoListItem.css'

class ToDoListItem extends Component {
    state = {
        showDetailsView: false,
        isDone: this.props.done,
        content: this.props.name,
        description: this.props.description,
        personid: this.props.executorid
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        console.log('changing props')
        console.log(prevProps)
        console.log(this.props)
        if(this.props.save !== prevProps.save){
            this.props.saveTask(
                {parent: {
                    taskid:this.props.parentid
                },
                executor: this.props.executorid === null? null : {
                    personid:this.props.executorid
                },
                description: this.state.description,
                timestart: new Date(),
                timeend: new Date(),
                name:this.state.content,
                done:this.props.done,
                priority:this.props.priority
            })
        }
    }
    // showDetailsViewHandler = () => {
    //     this.setState({ showDetailsView: !this.state.showDetailsView })
    // }
    componentDidMount(){
        console.log(`PROPS CHILD`)
        console.log(this.props)
    }
    render() {
        return(
            this.props.isActive?
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
            </div>:<></>
        )
    }
}

export default ToDoListItem