import React, { Component } from 'react'
import axios from 'axios'
import './PublicEvent.css'
import image from './images/image.jpg'
import image2 from './images/icon_new.png'
class PublicEvent extends Component{
    state={
        schedule:[]
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
                <div id="header">
                    <img src={image} className="float-right"/>
                    <div id="title_head">    
                    <h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h2>
                    <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac erat eget urna faucibus pellentesque sit amet eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ac erat eget urna faucibus pellentesque sit amet eget metus.</span>
                    <p className="text-indigo-500">
                        <br />
                        <a href="#">Lorem ipsum</a>
                        <a href="#" class="margin1">Lorem ipsum</a>
                    </p>
                    </div>    
                </div>
                <div className="scheduleContainer">
                <img src={image2} className="inline-block" />
                <h1 className="inline-block font-bold text-2xl ml-2">Harmonogram</h1>
                    {schedule}
                </div>
            </div>
        )
    }
}
export default PublicEvent