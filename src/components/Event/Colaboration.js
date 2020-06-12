import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'

class Colaboration extends Component{
    state={
        newCollaboratorText:'',
        collaborators:[{personId:1, email:'mail@com', pseudo:'Andrzej Dupa'}]
    }
    componentDidMount(){
        this.props.setCollaborators(this.props.eventId)
    }
    addCollaborator(){
        console.log(`Adding new collaborator: ${this.state.newCollaboratorText}`)
    }
    render(){
        return(
            <div>
                <div>
                    <p>Lista kolaborantów</p>
                    <ul>
                        {this.state.collaborators.map(element=>
                        <li>{element.email} - {element.pseudo}</li>)}
                    </ul>
                </div>
                <div>
                    <p>Dodaj nowego kolaboranta</p>
                    <input 
                        onChange={(e)=>this.setState({newCollaboratorText:e.target.value})} 
                        value={this.state.newCollaboratorText}></input>
                        <button 
                        onClick={()=>this.addCollaborator()}>Dodaj</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        myEvents:state.event.myEvents,
        ...ownProps
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCollaborators: (eventId) => dispatch(actions.setCollaborators(eventId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Colaboration)