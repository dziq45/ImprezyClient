import React, { Component } from 'react'
import axios from 'axios'
import './PublicEvent.css'
import Dropzone from 'react-dropzone'
import image from './images/image.jpg'
import image2 from './images/icon_new.png'
import imagePlaceholder from './images/imagePlaceholder.png'
import ExternalLink from './ExternalLink'
import minus from '../../images/minus.png'
import plus from '../../images/plus.png'
import okicon from './images/okicon.png'
import optionsIcon from './images/optionsicon.png'
import Counter from './Counter'
class PublicEvent extends Component{
    state={
        publicSchedule:true,
        schedule:[],
        creatorMode:false,
        name:"XXIII Dzień Papryki w Potworowie",
        description:"Tylko teraz występy takich zespołów jak: Republika, ABBA, Ich Troje. Nie zabraknie też naszych ulubionych kabareciarzy.\n Zajrzyj na nase media społecznościowe:",
        externalLinks:[{link: 'twitter.com', hovered:false}, {link:'https://www.youtube.com/watch?v=AFSMXLLOTg8', hovered: false}],
        newLink:''
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
                        description: "Występ zespołu Ich Troje",
                        hovered:false
                    },
                    {
                        hour: 14,
                        minute:20,
                        description: "Stand-up Lotka",
                        hovered:false
                    },
                    {
                        hour: 15,
                        minute:30,
                        description: "Występ zespołu Disco-Banjo",
                        hovered:false
                    },
                    {
                        hour: 17,
                        minute:30,
                        description: "Występ kabaretu Limo",
                        hovered:false
                    },
                    {
                        hour: 20,
                        minute:'00',
                        description: "Występ zespołu ABBA",
                        hovered:false
                    }
                ]
            }
            ]}
        this.setState({schedule:newState.eachDay})
    }
    onExternalLinkHover=(externalLinkIndex, flag)=>{
        let newLinks = this.state.externalLinks.map((item, index) => {
            if(index == externalLinkIndex){
                item.hovered = flag
                return item
            }
            else{
                return item
            }
        })
        this.setState({externalLinks:newLinks})
    }
    onAddLink(){
        let newLinks = [...this.state.externalLinks, {
            link:this.state.newLink,
            hovered:false
        }]
        this.setState({externalLinks:newLinks})
        console.log(newLinks)
    }
    deleteLink(externalLinkIndex){
        let newLinks = this.state.externalLinks.filter((item, index)=>index!==externalLinkIndex)
        console.log(newLinks)
        console.log(`LinkIndex = ${externalLinkIndex}`)
        this.setState({externalLinks:newLinks})
    }
    render(){
        console.log(`state:`)
        console.log(this.state.externalLinks)
        const schedule = this.state.schedule.map((scheduleDay, dayIndex)=>(
            <div className="ml-12">
                {scheduleDay.items.map((scheduleItem, itemIndex)=>(
                    <div>
                        <p className="text-xl">{scheduleItem.hour}:{scheduleItem.minute} {scheduleItem.description}</p>
                    </div>)
                )}
            </div>))
        const externalLinks = this.state.externalLinks.map((externalLink, linkIndex)=>(
            <div className="float-left flex relative" onPointerEnter={()=>this.onExternalLinkHover(linkIndex, true)} onPointerLeave={()=>{this.onExternalLinkHover(linkIndex, false)}}>
                <ExternalLink link={externalLink.link}></ExternalLink>
                {this.state.creatorMode && externalLink.hovered? <img src={minus} className="absolute right-0" width="32" height="32" onClick={()=>this.deleteLink(linkIndex)}></img>:null}
            </div>
        ))
        return(
            <div>
                <img src={optionsIcon} className="float-right w-10 mr-2 transition duration-500 ease-in-out transform hover:scale-125" onClick={()=>{this.setState({creatorMode:!this.state.creatorMode})}}></img>
                <div className="w-9/12 mx-auto">
                <div id="header">
                    {this.state.creatorMode? 
                    <Dropzone  onDrop={acceptedFiles=>console.log(acceptedFiles)}>
                        {({getRootProps, getInputProps}) => (
                        <section className="dropzone1">
                            <div {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <img src={imagePlaceholder} className="hover:shadow-md rounded-lg"></img>
                            </div>
                        </section>
                    )}
                </Dropzone> : <img src={image} className="float-right rounded-sm shadow-sm" width="420"/>}
                    
                    <div id="title_head">    
                        <textarea className={this.state.creatorMode? "eventName1 hover:shadow-md" : "eventName1"} value={this.state.name} onChange={(e)=>this.setState({name: e.target.value})} spellCheck="false" disabled={!this.state.creatorMode}></textarea>
                        <textarea className={this.state.creatorMode?"eventDescription1 hover:shadow-md" : "eventDescription1"} value={this.state.description} onChange={(e)=>this.setState({description: e.target.value})} spellCheck="false" disabled={!this.state.creatorMode}></textarea>
                            {externalLinks} 
                        <p className="text-indigo-500">
                            
                        </p>
                    </div>    
                </div>
                {this.state.publicSchedule?  
                    <div className="scheduleContainer">
                        <img src={image2} className="inline-block" />
                        <h1 className="inline-block font-bold text-2xl ml-2">Harmonogram</h1>
                        {schedule}
                    </div> : null}
                    <div className="counterContainer">
                        <Counter eventDate={new Date(2020, 5, 6)}></Counter>
                    </div>
                {this.state.creatorMode?
                    <div className="optionsContainer">
                        <div className="optionElement hover:border-gray-500" > Zmień szablon </div>
                        <div className="optionElement hover:border-gray-500" onClick={()=>this.setState({publicSchedule:!this.state.publicSchedule})}> Harmonogram </div>
                        <div className="optionElement hover:border-gray-500"> Sponsorzy </div>
                        <div className="optionElement"> 
                            <p>Dodaj link</p>
                            <input className="inline-block w-32 border-gray-500"  value={this.state.newLink} onChange={(e)=>{this.setState({newLink:e.target.value})}}></input>
                            <img className="inline-block ml-2 hover:shadow-md" src={plus} width="22" onClick={()=>this.onAddLink()}></img>
                        </div>

                    </div> : null}
            </div>
            </div>
            
        )
    }
}
export default PublicEvent