import React, { Component } from 'react'
import axios from 'axios'
import './PublicEvent.css'
import Dropzone from 'react-dropzone'
import image from './images/image.jpg'
import image2 from './images/icon_new.png'
import imagePlaceholder from './images/imagePlaceholder.png'
class PublicEvent extends Component{
    state={
        publicSchedule:true,
        schedule:[],
        creatorMode:false,
        name:"Lorem ipsum",
        description:"Krótki opis jak narazie"
    }
    componentDidMount(){
        let eventId = this.props.match.params.eventId
        console.log(`EvendID: ${eventId}`)
        const date = new Date()
        const newState = 
            {eachDay:[
                {date: date,
                    items:[{
                        hour: 12,
                        minute:45,
                        description: "Występ jakiegoś zespołu",
                        hovered:false
                    },
                    {
                        hour: 14,
                        minute:20,
                        description: "Koniec występu",
                        hovered:false
                    }
                ]
            }
            ]}
        this.setState({schedule:newState.eachDay})
    }
    render(){
        const schedule = this.state.schedule.map((scheduleDay, dayIndex)=>(
            <div className="ml-12">
                {scheduleDay.items.map((scheduleItem, itemIndex)=>(
                    <div>
                        <p className="text-xl">{scheduleItem.hour}:{scheduleItem.minute} {scheduleItem.description}</p>
                    </div>)
                )}
            </div>))
        
        return(
            <div>
                <div className="float-right" onClick={()=>{this.setState({creatorMode:!this.state.creatorMode})}}>Change mode</div>
                <div id="header">
                    {this.state.creatorMode? 
                    <Dropzone  onDrop={acceptedFiles=>console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                        <section className="dropzone1">
                            <div {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <img src={imagePlaceholder}></img>
                            </div>
                        </section>
                    )}
                </Dropzone> : <img src={image} className="float-right" width="420"/>}
                    
                    <div id="title_head">    
                    <textarea className="eventName1" value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} spellCheck="false" disabled={!this.state.creatorMode}></textarea>
                    <textarea className="eventDescription1" value={this.state.description} onChange={(e)=>this.setState({description: e.target.value})} spellCheck="false" disabled={!this.state.creatorMode}></textarea>
                    <p className="text-indigo-500">
                        <br />
                        <a href="#">Lorem ipsum</a>
                        <a href="#" class="margin1">Lorem ipsum</a>
                    </p>
                    </div>    
                </div>
                {this.state.publicSchedule?  
                    <div className="scheduleContainer">
                        <img src={image2} className="inline-block" />
                        <h1 className="inline-block font-bold text-2xl ml-2">Harmonogram</h1>
                        {schedule}
                    </div> : null}
                {this.state.creatorMode?
                    <div className="optionsContainer">
                        <div className="optionElement" onClick={()=>this.setState({publicSchedule:!this.state.publicSchedule})}> Harmonogram </div>
                        <div className="optionElement"> Sponsorzy </div>
                        <div className="optionElement"> Dodaj link </div>

                    </div> : null}
            </div>
        )
    }
}
export default PublicEvent