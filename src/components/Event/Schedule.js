import React, {Component} from 'react';
import DatePicker from "react-datepicker"
import './eventCss/Event.css'
import plusSign from '../../images/plus.png'
import minusSign from '../../images/minus.png'
import axios from 'axios'
import { AiOutlineCheck, AiOutlinePlusCircle } from "react-icons/ai";
import arrowDownSign from '../../images/arrowDown.png'
import "react-datepicker/dist/react-datepicker.css";
import {apiCaller} from '../../apiCaller'

const isTheSameDay = (date1, date2)=>{
    return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();
}
class Schedule extends Component{
    state={
        eachDay:[],
        newHour:12,
        newMinute:30,
        newDescription:"",
        scheduleId:null
    }
    fetchItemsAndParseToState = async(scheduleID)=>{
        apiCaller().get('/scheduledetail/getbyscheduleid/' + scheduleID)
        .then(res=>{
            console.log(res.data)
            let items = res.data
            items.sort((a,b)=>{
                let dateA = new Date(a.timestart)
                console.log(`dataA: ${dateA}`)
                let dateB = new Date(b.timestart)
                return dateA - dateB
            })
            let newEachDay=[]
            let lastDate = new Date(items[0].timestart) 
            let lastDay=0
            newEachDay.push({
                date:lastDate,
                items:[
                    {
                        hour: lastDate.getHours(),
                        minute: lastDate.getMinutes(),
                        description: items[0].description,
                        hovered:false
                    }
                ]
            })
            for(let i = 1; i <items.length; i++){
                let newDate = new Date(items[i].timestart)
                if(isTheSameDay(lastDate, newDate)){
                    newEachDay[lastDay].items.push({
                        hour: newDate.getHours(),
                        minute: newDate.getMinutes(),
                        description: items[i].description,
                        hovered:false
                    })
                }
                else{
                    lastDay++
                    lastDate = newDate
                    newEachDay.push({
                        date: newDate,
                        items:[{
                            hour: newDate.getHours(),
                            minute: newDate.getMinutes(),
                            description: items[i].description,
                            hovered:false
                        }]
                    })
                }
            }
            console.log('Pobrane wszystkie itemy i sparsowane')
            console.log(newEachDay)
            this.setState({eachDay:newEachDay})
        })
        .catch(err=>{
            //No items
            console.log('Nie ma żadnego itema')
        })
    }
    componentDidMount(){
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
        this.setState(newState)
        let scheduleID = null
        apiCaller().get('/schedule/getbyeventid/' + this.props.eventId)
        .then(res=>{
            console.log('Był już harmonogram:')
            console.log(res.data)
            scheduleID = res.data[0].scheduleid
            this.fetchItemsAndParseToState(scheduleID)
            this.setState({scheduleId: res.data[0].scheduleid})
        })
        .catch(err=>{
            console.log('Zaczynam dodawanie domyślnego Harmonogramu')
            apiCaller().post('/schedule/add', {
                event:{
                    eventid: this.props.eventId
                },
                title:"Harmonogram imprezy"
            })
            .then(res=>{
                console.log('Dodałem harmonogram:')
                console.log(res.data)
                scheduleID = res.data.scheduleid
                this.fetchItemsAndParseToState(scheduleID)
                this.setState({scheduleId: res.data.scheduleid})
            })
            .catch(err=>{
                console.log('Nie udało sie dodać harmonogramu')
            })
            console.log(err)
        })
    }
    onAddItem=(e, dayIndex)=>{
        e.preventDefault()
        const newEachDay = this.state.eachDay.map((thisDay, index)=>{
            if(index ===dayIndex){
                thisDay.items.push ({
                    hour:this.state.newHour,
                    minute:this.state.newMinute,
                    description:this.state.newDescription,
                    hovered:false
                })
                return thisDay
            }
            else{
                return thisDay
            }
        })
        this.setState({eachDay:newEachDay, newHour:12, newMinute:30, newDescription:""})
        console.log(newEachDay);
    }
    onPushItemDown = (dayIndex, upperItemIndex)=>{
        const newEachDay = this.state.eachDay.map((thisDay, index)=>{
            if(index ===dayIndex){
                let newItem = {
                    hour:12,
                    minute:30,
                    description:""
                }
                thisDay.items.splice(upperItemIndex+1, 0, newItem)
                return thisDay
            }
            else{
                return thisDay
            }
        })
        this.setState({eachDay:newEachDay})
    }
    onAddNextDay=()=>{
        let stateCopy = {...this.state}
        let newDate
        if(stateCopy.eachDay.length >=1){
            newDate = new Date(stateCopy.eachDay[stateCopy.eachDay.length-1].date)
        }
        else{
            newDate = new Date()
        }
        newDate.setDate(newDate.getDate() + 1)
        const newDay = {
            date: newDate,
            items:[]
        }
        stateCopy.eachDay.push(newDay)
        this.setState(stateCopy)
    }
    onHover=(dayIndex, itemIndex, flag)=>{
        const newEachDay = this.state.eachDay.map((thisDay, thisDayIndex)=>{
            if(thisDayIndex ===dayIndex){
                let items = thisDay.items.map((thisItem, thisItemIndex)=>{
                    if(thisItemIndex === itemIndex){
                        return Object.assign(thisItem,{hovered:flag})
                    }
                    else{
                        return thisItem
                    }
                })
                thisDay.items = items
                return thisDay
            }
            else{
                return thisDay
            }
        })
        this.setState({eachDay:newEachDay})
    }
    onDeleteItem = (dayIndex, itemIndex)=>{
        const newEachDay = this.state.eachDay.map((thisDay, thisDayIndex)=>{
            if(dayIndex === thisDayIndex){
                let newItems = thisDay.items.filter((item, index)=>index!==itemIndex)
                thisDay.items = newItems
                return thisDay
            }
            else{
                return thisDay
            }
        })
        console.log(newEachDay)
        this.setState({eachDay:newEachDay})
    }
    onEditValue=(e, dayIndex, itemIndex, type)=>{ //type = 0 - hour type = 1 - minute type = 2 - description
        e.preventDefault()
        console.log(`Dayindex: ${dayIndex}  itemIndex: ${itemIndex} type: ${type}`)
        const newEachDay = this.state.eachDay.map((thisDay, thisDayIndex)=>{
            if(thisDayIndex ===dayIndex){
                let newItems = thisDay.items.map((item,thisIndex)=>{
                    if(thisIndex === itemIndex){
                        switch(type){
                            case 0:
                                return{
                                    hour:e.target.value,
                                    minute:item.minute,
                                    description:item.description,
                                    hovered:item.hovered
                                }
                            case 1:
                                return{
                                    hour:item.hour,
                                    minute:e.target.value,
                                    description:item.description,
                                    hovered:item.hovered
                                }
                            case 2:
                                return{
                                    hour:item.hour,
                                    minute:item.minute,
                                    description:e.target.value,
                                    hovered:item.hovered
                                }
                        }
                    }
                    else{
                        return item
                    }
                })
                thisDay.items = newItems
                return thisDay
            }
            else{
                return thisDay
            }
        })
        this.setState({eachDay:newEachDay})
    }

    saveItems=()=>{
        this.state.eachDay.forEach((day, dayIndex)=>{
            day.items.forEach((item, itemIndex)=>{
                let newDate = new Date(day.date)
                newDate.setHours(item.hour)
                newDate.setMinutes(item.minute)
                console.log(newDate)

                let body={
                    schedule:{
                        scheduleid: this.state.scheduleId
                    },
                    timestart:newDate,
                    timeend:newDate,
                    description:item.description
                }
                console.log(newDate.getFullYear()+'-'+newDate.getMonth()+'-'+newDate.getDate()+'T'+newDate.getHours()+':'+newDate.getMinutes())
                apiCaller().post('/scheduledetail/add', {
                    schedule:{
                        scheduleid: this.state.scheduleId
                    },
                    timestart:newDate,
                    timeend:newDate,
                    description:item.description
                })
                .then(res=>{
                    console.log(res)
                })
                .catch(err=>{
                    console.log(err)
                    console.log("error")
                })
            })
        })
    }
    handleSaveSchedule=(e)=>{
        e.preventDefault()
        apiCaller().put('/schedule/removescheduleitems/' + this.state.scheduleId)
        .then(res=>{
            console.log(res)
           this.saveItems()
        })
        .catch(err=>{
            console.log(err)
            this.saveItems()
        })
    }
    onDeleteDay=(dayIndex)=>{
        let newEachDay = this.state.eachDay.filter((day, index)=> index!==dayIndex)
        console.log(newEachDay)
        this.setState({eachDay:newEachDay})
    }
    onSetDate=(e, dayIndex)=>{
        console.log(e)
        const newEachDay = this.state.eachDay.map((thisDay, thisDayIndex)=>{
            if(thisDayIndex === dayIndex){
                thisDay.date = new Date(e)
                return thisDay
            }
            else{
                return thisDay
            }
        })
        this.setState({eachDay:newEachDay})
    }
    render(){
        const days = this.state.eachDay.map((day,index)=>(
            <div className="one-day-schedule">
                <div className="dateLine">
                <DatePicker
                    selected={day.date}
                    onChange={(e)=>this.onSetDate(e, index)}
                    dateFormat="dd MMM yyyy"
                    locale="pl-PL"
                />
                <div className="inline-block" onClick={()=>{this.onDeleteDay(index)}}>
                    <img src={minusSign} width="18"></img>
                </div>
                </div>
                <div className="flexCardBoard">
                {day.items.map((item, indexItem)=>(
                <div className="card" onPointerOver={()=>{this.onHover(index, indexItem, true)}} onPointerOut={()=>{this.onHover(index, indexItem, false)}}>
                    
                    <p>
                    <input type="number" min="0" max="23" className="numberInput" value={item.hour} onChange={(e)=>this.onEditValue(e,index,indexItem,0)}></input>: 
                    <input type="number" min="0" max="59" className="numberInput" value={item.minute} onChange={(e)=>this.onEditValue(e,index,indexItem,1)}></input>
                    </p>
                    
                    <textarea className="textAreaInput" rows = "2" columns = "14"  maxLength="28" placeholder="Wpisz nazwę zadania..." value={item.description} onChange={(e)=>this.onEditValue(e,index,indexItem,2)}></textarea>
                    
                        <div className="actionButtons">
                            <img className={item.hovered? "inline-block": "inline-block hidden"} src={minusSign} width="18"  onClick={()=>{this.onDeleteItem(index,indexItem)}}></img>
                            <img className={item.hovered? "inline-block": " inline-block hidden"} src={arrowDownSign} width="18" onClick={()=>{this.onPushItemDown(index,indexItem)}}></img>
                        </div>
                 </div>))}

                 <form onSubmit={(e)=>this.onAddItem(e,index)}>
                    {/* <input type="hidden" min="0" max="23" className="numberInput" value={this.state.newHour} onChange={(e)=>{this.setState({newHour:e.target.value})}}></input> 
                    <input type="hidden" min="0" max="59" className="numberInput" value={this.state.newMinute} onChange={(e)=>{this.setState({newMinute:e.target.value})}}></input><span className="pl-4"></span>
                    <input type ="hidden" className="bg-transparent" value={this.state.newDescription} onChange={(e)=>{this.setState({newDescription:e.target.value})}}></input> */}
                    {/* <input src={plusSign} type="image" alt="Submit" width="18"></input> */}
                    <div className="new-day-event" onClick={e => this.onAddItem(e, index)}><AiOutlinePlusCircle /></div>
                 </form> 
                 </div>
                   
            </div>))
        return(
            <div>
                <div className="optionTitle">
                    <p>Harmonogram wydarzenia {this.state.scheduleId}</p>
                </div>
                {days}
                <div className="font-bold cursor-pointer" onClick={()=>{this.onAddNextDay()}}>
                    <p> Dodaj kolejny dzień</p>
                </div>
                <div className="submitBtn w-3/12" onClick={(e)=>{this.handleSaveSchedule(e)}}><span style={{float:'left', marginRight: '2%'}}><b>Potwierdź zmiany</b></span><span><AiOutlineCheck /></span></div>
            </div>
        )
    }
}


export default Schedule