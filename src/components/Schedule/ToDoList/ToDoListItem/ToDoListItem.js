import React, { Component } from 'react'
import { AiFillSafetyCertificate, AiOutlineClose, AiOutlineDown } from "react-icons/ai"
import {connect} from 'react-redux'
import Select from 'react-select'
import './ToDoListItem.css'

class ToDoListItem extends Component {
    state = {
        showDetailsView: false,
        isDone: this.props.done,
        content: this.props.name,
        description: this.props.description,
        personid: this.props.executorid,
        options:[],
        selectedOption:null
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
                executor: this.state.selectedOption === null? null : {
                    personid:this.state.selectedOption.value
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

    componentDidMount(){
        console.log(`PROPS CHILD`)
        console.log(this.props.collaborators)
        let arr = []
        for(let i = 0; i < this.props.collaborators.length; i++){
            arr.push({value:this.props.collaborators[i].personId, label:this.props.collaborators[i].name})
        }
        this.setState({options:[...arr]})
        if(this.props.executorid){
            this.setState({selectedOption:{value:this.props.executorid}})
        }
        console.log('arr')
        console.log(arr)

    }
    handleSelect(selectedOption){
        console.log(selectedOption)
        this.setState({ selectedOption })
    }
    render() {
        return(
            this.props.isActive?
            <div className="to-do-list-item-box">
                {this.state.options.length}
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
                    <Select
                        value={this.state.selectedOption}
                        onChange={(e) => this.handleSelect(e)}
                        options={this.state.options}
                        menuPortalTarget={document.querySelector('body')}
                        ></Select>

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
const mapStateToProps = state => {
    console.log(state)
    return {
        collaborators : state.event.collaborators
    }
}
export default connect(mapStateToProps)(ToDoListItem) 