import React, { Component } from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import '../Auth.css'






class ChangePassword extends Component{

    state = {
        dbPassword : '',
        oldPassword : '',
        newPassword : '',
        confirmNewPassword : '',
        isOldMatching : false,
        isConfirmMatching : false,
        userData:null
    }

    componentDidMount() {
        axios.get('person/get/' + this.props.userId)
            .then(response => {
                console.log(`Response: ${response.data}`)
                this.setState({dbPassword: response.data.password })
                this.setState({userData:response.data})
            })
            .catch(err=>{
                console.log(err)
            })  
            
        
    }

    handleSubmit=async(e)=>{
        e.preventDefault()
        if(this.state.oldPassword == this.state.dbPassword){
            console.log("Old password good")

            if(this.state.newPassword == this.state.confirmNewPassword && this.state.newPassword != '' && this.state.confirmNewPassword != ''){
                console.log("New/Confirm password good")
                
                this.state.userData.password = this.state.newPassword;
                console.log(this.state.userData.password)
                const response = await axios.put('/person/update/' + this.props.userId,this.state.userData)
                alert("Zmiana hasła udana.");
             }
             else{
                alert("Nowe hasło i potwierdzenie hasła nie zgadzają się");
             }
        }
        else{
            alert("Obecne hasło nie zgadza się.");
        }
        
        

    }


    render() {
        return(
           
           <div> 
               <form class="form-style" onSubmit={this.handleSubmit}>
                   <label class="font-semibold ml-2" >Stare hasło</label>
                   <input class="InputElement mb-2" type="password" onChange={(e)=>this.setState({oldPassword:e.target.value})} value = {this.state.oldPassword}></input>
                   <label class="font-semibold ml-2">Nowe hasło</label>
                   <input class="InputElement mb-2" type="password" onChange={(e)=>this.setState({newPassword:e.target.value})} value = {this.state.newPassword}></input>
                   <label class="font-semibold ml-2">Potwierdź nowe hasło</label>
                   <input class="InputElement mb-2" type="password" onChange={(e)=>this.setState({confirmNewPassword:e.target.value})} value = {this.state.confirmNewPassword}></input>
                   <input class="Button" type="submit" value='Zapisz'></input>
               </form>
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



export default connect(mapStateToProps)(ChangePassword)