import React, { Component } from 'react'
import axios from 'axios'
import * as actions from '../../store/actions/index'
import './PublicEvent.css'
import {connect} from 'react-redux'
import Dropzone from 'react-dropzone'
import image from './images/image.jpg'
import image2 from './images/icon_new.png'
import imagePlaceholder from './images/imagePlaceholder.png'
import minus from '../../images/minus.png'
import plus from '../../images/plus.png'
import okicon from './images/okicon.png'
import optionsIcon from './images/optionsicon.png'
import mailicon from '../../images/mailicon.png'
import ExternalLink from './ExternalLink'
import Counter from './Counter'
import MessageForm from '../Messages/MessageForm'
import {Link} from 'react-router-dom'
class PublicEvent extends Component{
    state={
        isTemporaryImageShown:false,
        publicSchedule:true,
        publicCounter:true,
        schedule:[], //not used
        creatorMode:false,
        creatorId:null,
        name:"",
        description:"",
        externalLinks:[{link: 'twitter.com', hovered:false}],
        newLink:'',
        imageName: '',
        imageURL:null,
        imageFile:null,
        showForm:false,
        loginRedirect:false,
    }
    constructor(props) {
        super(props);
        this.showMessageForm = this.showMessageForm.bind(this);
        this.hideMessageForm = this.hideMessageForm.bind(this);
      }
    showMessageForm() {
        this.setState({
            loginRedirect: true,
          });
        console.log(this.props.userId)
        if(this.props.userId != this.state.creatorId)
        this.setState({
            showForm: true,
          });
 
      }
    hideMessageForm() {
        this.setState({
          showForm: false,
        });
      }
    componentDidMount(){
        let eventId = this.props.match.params.eventId
        axios.get('/eventdetail/getbyevent/' + eventId + '/public')
        .then(res=>{
            console.log(res.data)
            let creatorId = res.data[0].event.creator.personid
            this.setState({creatorId:creatorId}) 
            if(res.data[0].value == 'true'){
                axios.get('/schedule/getbyeventid/' + eventId)
                .then(res=>{
                    let scheduleID = res.data[0].scheduleid
                    this.props.setSchedule(scheduleID)
                })
                .catch(err=>{
                    console.log(err)
                })
                axios.get('/eventdetail/getbyevent/' + eventId)
                .then(res=>{
                    let details = res.data
                    details.forEach((item,index)=>{
                        switch(item.type){
                            case "publicDescription":
                                this.setState({description : item.value})
                                break
                            case "publicName":
                                this.setState({name : item.value})
                                break
                            case "publicImage":
                                this.setState({imageSrc : item.value})
                                console.log(`src do obrazka: ${item.value}`)
                                let slashIndex = item.value.lastIndexOf('/')
                                let imageName = item.value.substring(slashIndex+1)
                                this.setState({imageName:imageName})
                                console.log(imageName)
                                axios.get('/file/get/' + imageName)
                                .then(res=>{
                                    console.log("ZDJECIE")
                                    console.log(res)
                                    let getFile = JSON.stringify(res.data)
                                    let file = JSON.parse(getFile)
                                    console.log(file)
                                    this.setState({imageURL:URL.createObjectURL(file)})
                                    this.setState({image:res.data})
                                })
                                .catch(err=>{
                                    console.log(err)
                                })
                                break
                            case "publicSchedule":
                                item.value === 'true'?this.setState({publicSchedule:true}) : this.setState({publicSchedule:false})
                                break
                            case "publicCounter":
                                item.value === 'true'?this.setState({publicCounter:true}) : this.setState({publicCounter:false})
                        }
                    })
                })
            }
            else{
                console.log('Wydarzenie niepubliczne')
            }
        })
        .catch(err=>{
            console.log('Nie ma takiego wydarzenia albo jest niepubliczne')
        })
        console.log(`EvendID: ${eventId}`)
        console.log(this.props)
        const date = new Date()
        const newState = //not used
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
    onAddLink(e){
        e.preventDefault()
        let newLinks = [...this.state.externalLinks, {
            link:this.state.newLink,
            hovered:false
        }]
        this.setState({externalLinks:newLinks, newLink:''})
        console.log(newLinks)
    }
    deleteLink(externalLinkIndex){
        let newLinks = this.state.externalLinks.filter((item, index)=>index!==externalLinkIndex)
        console.log(newLinks)
        console.log(`LinkIndex = ${externalLinkIndex}`)
        this.setState({externalLinks:newLinks})
        
    }
    saveEventProperties(){
        let eventId = this.props.match.params.eventId
        axios.get('/eventdetail/getbyevent/' + eventId) 
        .then(res=>{
            let details = res.data
            details.forEach(element => {
                axios.delete('/eventdetail/delete/' + element.eventdetailid)
            });
            axios.post('/eventdetail/add',{
                event:{
                    eventid:eventId
                },
                type:"public",
                value:"true"
            }).then(res=>{
                this.setState({publicDetailID : res.data.eventdetailid})
            }).catch(err=>{
                console.log(err)
            })
            axios.post('/eventdetail/add',{
                event:{
                    eventid:eventId
                },
                type:"publicDescription",
                value:this.state.description
            })
            axios.post('/eventdetail/add',{
                event:{
                    eventid:eventId
                },
                type:"publicName",
                value:this.state.name
            })
            axios.post('/eventdetail/add',{
                event:{
                    eventid:eventId
                },
                type:"publicSchedule",
                value:this.state.publicSchedule? "true" : "false"
            })
            axios.post('/eventdetail/add',{
                event:{
                    eventid:eventId
                },
                type:"publicCounter",
                value:this.state.publicCounter? "true" : "false"
            })
            let form = new FormData()
                form.append("file", this.state.imageFile,  this.state.imageFile.path)
                axios.post('/file/upload',form
                )
                .then(res=> {
                    console.log('UPLOAD OBRAZKA')
                    axios.post('/eventdetail/add',{
                        event:{
                            eventid:eventId
                        },
                        type:"publicImage",
                        value:res.data.path
                    })
                    .then(res=>{
                        console.log("Dodane zdjecie")
                    })

                })
                .catch(err=>console.log(err))
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render(){
        

        console.log(`state:`)
        console.log(this.state.externalLinks)
        const schedule = this.props.schedule.map((scheduleDay, dayIndex)=>(
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
        const creatorButton = this.state.creatorId === this.props.userId?
            <img src={optionsIcon} className="float-right w-10 mr-2 transition duration-500 ease-in-out transform hover:scale-125" onClick={()=>{this.setState({creatorMode:!this.state.creatorMode})}}></img>
            : null
        return(
            <div>
                {creatorButton}
                <div className="w-9/12 mx-auto">
                <div id="header">
                    {this.state.creatorMode? 
                    <Dropzone  onDrop={acceptedFiles=>{
                        console.log(acceptedFiles[0])
                        let siema = URL.createObjectURL(acceptedFiles[0])
                        console.log("URL ZDJECIE")
                        console.log(siema)
                        this.setState({imageURL:URL.createObjectURL(acceptedFiles[0]), isTemporaryImageShown:true})
                        this.setState({imageFile:acceptedFiles[0]})
                    }}>
                        {({getRootProps, getInputProps}) => (
                        <section className="dropzone1">
                            <div {...getRootProps()}>
                                <input {...getInputProps()}/>
                                <img src={imagePlaceholder} className="hover:shadow-md rounded-lg"></img>
                            </div>
                        </section>
                    )}
                </Dropzone> : <img src={this.state.isTemporaryImageShown? this.state.imageURL : "/file/get/" + this.state.imageName} className="float-right rounded-sm shadow-sm w-5/8 h-full " width="420"/>}
                    
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
                        <h1 className="inline-block font-bold text-2xl ml-2">Harmonogram wydarzenia</h1>
                        {schedule}
                    </div> : null}
                    {this.state.publicCounter? 
                        <div className="counterContainer">
                            <Counter eventDate={new Date(2020, 5, 6)}></Counter>
                        </div> : null}
                    {!this.state.creatorMode?
                    <div className="messageContainer">
                        <div className="mailText displayInlineBlock">Zapytaj organizatora wydarzenia</div>
                        {this.props.isAuthenticated ?
                            <img src={mailicon} alt='Wiadomość do organizatora' className="icon displayInlineBlock" onClick={() => this.showMessageForm()}></img> :
                            <Link to="/auth"><img src= {mailicon} className="icon displayInlineBlock"></img></Link>}
                            {this.state.showForm ?
                        <div className="popupForm">
                            <MessageForm hide = {this.hideMessageForm} receiverid={this.state.creatorId} senderid={this.props.userId}></MessageForm>
                        </div>:
                            null}  
                    </div> : null}
                {this.state.creatorMode?
                    <div className="optionsContainer">
                        <div className="optionElement hover:border-gray-500" > Zmień szablon </div>
                        <div className="optionElement hover:border-gray-500" onClick={()=>this.setState({publicSchedule:!this.state.publicSchedule})}> Harmonogram </div>
                        <div className="optionElement hover:border-gray-500" onClick={()=>this.setState({publicCounter:!this.state.publicCounter})}> Odliczanie </div>
                        <div className="optionElement hover:border-gray-500"> Sponsorzy </div>
                        <div className="optionElement"> 
                            <p>Dodaj link</p>
                            <form onSubmit={(e)=>this.onAddLink(e)}>
                                <input className="inline-block w-32 border-gray-500"  value={this.state.newLink} onChange={(e)=>{this.setState({newLink:e.target.value})}}></input>
                                <input type="image" className="inline-block ml-2 hover:shadow-md" src={plus} width="22"></input>
                            </form>
                        </div>
                        <div className="optionElement hover:border-gray-500" onClick={()=>this.saveEventProperties()}> Zapisz </div>

                    </div> : null}
            </div>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    
    return {
      isAuthenticated: state.auth.token !== null,
      userId: state.auth.userId,
      schedule:state.event.schedule
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setSchedule: (scheduleID) => dispatch(actions.setSchedule(scheduleID)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PublicEvent)