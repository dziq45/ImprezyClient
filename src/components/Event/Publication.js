import React, {Component} from 'react';
import './eventCss/Event.css'

class Publication extends Component{
    state={
        isPublic:false
    }
    componentDidMount(){
        
    }
    switchPublicPrivateHandler = (e)=>{
        const value = !this.state.isPublic
        this.setState({isPublic:value})
        console.log(value)
    }
    render(){
        return(
            //<div onClick={()=>{this.setState({isPublic:!this.state.isPublic})}} className={this.state.isPublic? "bg-green-700":"bg-red-700"}>Publication</div>
            <div>
                <p><b>Publiczne</b></p>
                <label class="switch"> 
                    <input type="checkbox" onChange={(e)=>{this.switchPublicPrivateHandler(e)}}></input>
                    <span className="slider round"></span>
                </label>

            </div>
        )
    }
}
export default Publication