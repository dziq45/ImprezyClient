import React, {Component} from 'react';
import './eventCss/Event.css'
import axios from 'axios'


class Publication extends Component{
    state={
        isPublic:false,
        publicDetailID:null
    }
    setNewDetailisPublic=async()=>{
        axios.post('/eventdetail/add',{
            event:{
                eventid:this.props.eventId
            },
            type:"public",
            value:"false"
        }).then(res=>{
            this.setState({publicDetailID : res.data.eventdetailid})
        }).catch(err=>{
            console.log(err)
        })
        this.setState({isPublic:false})
    }
    componentDidMount(){
        axios.get('/eventdetail/getbyevent/' + this.props.eventId)
        .then(res=>{
            console.log(res.data)
            if(res.data.length == 0){
                this.setNewDetailisPublic()
            }
            else{
                let isPublicField = false
                for(let i = 0; i < res.data.length; i++){
                    if(res.data[i].type == "public"){
                       this.setState({isPublic : res.data[i].value == "true"? true : false})
                       this.setState({publicDetailID : res.data[i].eventdetailid})
                       isPublicField = true 
                    }
                }
                if(!isPublicField){
                    this.setNewDetailisPublic()
                }
            }
        })
        .catch(err=>{
            this.setNewDetailisPublic()
        })
    }
    switchPublicPrivateHandler = (e)=>{
        const newValue = !this.state.isPublic
        this.setState({isPublic:newValue})
        axios.put('/eventdetail/update/' + this.state.publicDetailID,{
            event:{
                eventid:this.props.eventId
            },
            type:"public",
            value: newValue
        }).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err)
        })
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