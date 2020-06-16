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
        if(this.props.save !== prevProps.save){
            this.props.saveTask(
                {parent: {
                    taskid:this.props.parentid
                },
                executor: this.props.selectedOption === null? null : {
                    eventPersonId: {
                        eventid: this.props.eventId,
                        personid: this.props.selectedOption.value                    }
                },
                description: this.props.description,
                timestart: new Date(),
                timeend: new Date(),
                name:this.props.name,
                done:this.props.done,
                priority:this.props.priority
            })
            .then(res=>{
                
            })
        }
        if(this.props.selectedOption.label !== prevProps.selectedOption.label){
            if(this.props.selectedOption.value !== null){
                for(let option of this.state.options){
                    if(this.props.selectedOption.value === option.value){
                        let selected = {
                            value: option.value,
                            label: option.label
                        }
                        this.props.updateComponent(this.props.parentIndex, this.props.index, {selectedOption: selected})
                    }
                }
            }
        }
    }

    componentDidMount(){
        console.log(`PROPS CHILD`)
        console.log(this.props)
        console.log('KONIEC PROPS')
        let arr = []
        for(let i = 0; i < this.props.collaborators.length; i++){
            arr.push({value:this.props.collaborators[i].personId, label:this.props.collaborators[i].name})
            if(arr[i].value == this.props.executorid){
                console.log('selected')
                console.log(arr[i])
                //this.setState({selectedOption:arr[i]})
                this.props.updateComponent(this.props.parentIndex, this.props.index, {selectedOption:arr[i]})
            }
        }
        this.setState({options:[...arr]})
    }
    handleSelect(selectedOption){
        console.log('selectedOption')
        console.log(selectedOption)
        //this.setState({ selectedOption })
        this.props.updateComponent(this.props.parentIndex, this.props.index, {selectedOption})
    }
    render() {
        return(
            this.props.isActive?
            <div className="to-do-list-item-box">
                <div className="float-right mr-2" onClick={()=>this.props.deleteTask(this.props.parentIndex, this.props.index)}>Usuń</div>
                <div className="to-do-list-item-is-done" style={{ display: 'inline-flex' }}>
                    {this.props.done
                        ? <AiFillSafetyCertificate onClick={e => this.props.onDone(this.props.index, false) }/>
                        : <AiOutlineClose onClick={e =>  this.props.onDone(this.props.index, true) }/>
                    }
                </div>
                <div style={{ width: '100%', float: 'left' }}>
                    <input className="to-do-list-item-content" 
                        type="text" 
                        value={this.props.name} 
                        onChange={e => this.props.updateComponent(this.props.parentIndex, this.props.index, {name:e.target.value})} 
                        disabled={this.props.disabled}/>
                    <Select
                        value={this.props.selectedOption}
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
                            value={this.props.description} 
                            onChange={(e)=>this.props.updateComponent(this.props.parentIndex, this.props.index, {description:e.target.value})} 
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
        collaborators : state.event.collaborators,
        eventId : state.event.activeEventId
    }
}
export default connect(mapStateToProps)(ToDoListItem) 