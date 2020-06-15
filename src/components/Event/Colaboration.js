import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import { AiFillCodeSandboxCircle } from 'react-icons/ai';
import axios from 'axios';

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
        axios.get('/person/getbyemail/' + this.state.newCollaboratorText)
        .then(res=>{
            console.log(res.data)
            const personId = res.data.personid
            axios.post('/role/add',{
                rolename:this.state.colabName
            })
            .then(res2=>{
                const roleId = res2.data.roleid
                console.log(`Dodano nazwę o id ${roleId}`)
                axios.post('/eventperson/add',{
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
    render(){
        return(
            <div>
                <div>
                    <p>Lista kolaborantów</p>
                    <ul>
                        {this.props.collaborators.map(element=>
                        <li key={element.personId}>{element.email} - {element.name}</li>)}
                    </ul>
                </div>
                <div>
                    <p>Dodaj nowego kolaboranta</p>
                    <input 
                    onChange={(e)=>this.setState({newCollaboratorText:e.target.value})} 
                    value={this.state.newCollaboratorText}
                    placeholder="Email"></input>
                    <input 
                    onChange={(e)=>{this.setState({colabName:e.target.value})}}
                    value={this.state.colabName}></input>
                    <button 
                    onClick={()=>this.addCollaborator()}>Dodaj</button>
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