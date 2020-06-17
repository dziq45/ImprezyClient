import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import { AiOutlineDelete } from 'react-icons/ai';
import './Colaboration.css'
import axios from 'axios';
import { TiDeleteOutline } from "react-icons/ti";

import {apiCaller} from '../../apiCaller'

class Colaboration extends Component{
    state={
        newCollaboratorText:'',
        colabName:''
    }
    componentDidMount(){
        //this.props.setCollaborators(this.props.eventId)
    }
    addCollaborator(){
        console.log(`Adding new collaborator: ${this.state.newCollaboratorText} ${this.state.colabName}`)
        apiCaller().get('/person/getbyemail/' + this.state.newCollaboratorText)
        .then(res=>{
            console.log(res.data)
            const personId = res.data.personid
            apiCaller().post('/role/add',{
                rolename:this.state.colabName
            })
            .then(res2=>{
                const roleId = res2.data.roleid
                console.log(`Dodano nazwę o id ${roleId}`)
                apiCaller().post('/eventperson/add',{
                    eventPersonId: {
                        eventid: this.props.eventId,
                        personid: personId
                    },
                    role: {
                        roleid: roleId
                    }
                })
                .then(res3=>{
                    console.log(res3.data)
                    this.props.setCollaborators(this.props.eventId)

                })
                .catch(err3=>{
                    console.log(err3.response.data)
                })
            })
            .catch(err2=>{
                console.log(err2.response.data)
            })
        })
        .catch(err=>{
            console.log(err.response.data)
        })
    }
    deleteCollaborator(personId){
        apiCaller().delete('/eventperson/delete/' + this.props.eventId + '/' + personId)
        .then(res=>{
            this.props.setCollaborators(this.props.eventId)
        })
    }
    render(){
        return(
            <div>
                <div>
                    <div className="addNewUserTitle">
                        <p>Dodaj nowego kolaboranta</p>
                    </div>
                    <div className="addNewUserInputBox">
                        <input 
                        onChange={(e)=>this.setState({newCollaboratorText:e.target.value})} 
                        value={this.state.newCollaboratorText}
                        placeholder="Email"></input>
                        <input 
                        onChange={(e)=>{this.setState({colabName:e.target.value})}}
                        value={this.state.colabName}
                        placeholder="ColabName">
                        </input>
                        <button 
                        className="eventFormSubmitBtn"
                        onClick={()=>this.addCollaborator()}>Dodaj</button>
                    </div>
                </div>
                <div className="usersList">
                    <p>Lista kolaborantów</p>
                    <ul>
                        {this.props.collaborators.map((element, index)=>
                        
                        <li key={element.personId}>
                            <span className="inline-block text-lg w-1/2">{element.email} - {element.name}</span>
                            <div className="w-1/2 inline-block " >
                                <AiOutlineDelete onClick={()=>{this.deleteCollaborator(this.props.collaborators[index].personId)}}
                                    className="hover:text-red-600" 
                                    style={{fontSize:'170%', marginLeft:'90%'}}></AiOutlineDelete>
                            </div>    
                        </li>)}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        collaborators:state.event.collaborators,
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCollaborators: (eventId) => dispatch(actions.setCollaborators(eventId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Colaboration)