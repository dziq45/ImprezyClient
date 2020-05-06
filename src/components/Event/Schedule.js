import React, {Component} from 'react';
import DatePicker from "react-datepicker"
import './eventCss/Event.css'
import plusSign from '../../images/plus.png'
import minusSign from '../../images/minus.png'
import arrowDownSign from '../../images/arrowDown.png'
import "react-datepicker/dist/react-datepicker.css";
class Schedule extends Component{
    state={
        eachDay:[],
        newHour:12,
        newMinute:30,
        newDescription:"",
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
        let newDate = new Date(stateCopy.eachDay[stateCopy.eachDay.length-1].date)
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
            <div>
                <div className="dateLine">
                <DatePicker
                    selected={day.date}
                    onChange={(e)=>this.onSetDate(e, index)}
                />
                </div>
                <div className="flexCardBoard">
                {day.items.map((item, indexItem)=>(
                <div className="card" onPointerOver={()=>{this.onHover(index, indexItem, true)}} onPointerOut={()=>{this.onHover(index, indexItem, false)}}>
                    
                    <p>
                    <input type="number" min="0" max="23" className="numberInput" value={item.hour} onChange={(e)=>this.onEditValue(e,index,indexItem,0)}></input>: 
                    <input type="number" min="0" max="59" className="numberInput" value={item.minute} onChange={(e)=>this.onEditValue(e,index,indexItem,1)}></input>
                    </p>
                    
                    <textarea className="textAreaInput" rows = "2" columns = "14"  maxLength="28" placeholder="Zadanie..." value={item.description} onChange={(e)=>this.onEditValue(e,index,indexItem,2)}></textarea>
                    
                        <div className="actionButtons">
                            <img className={item.hovered? "inline-block": "inline-block hidden"} src={minusSign} width="18"  onClick={()=>{this.onDeleteItem(index,indexItem)}}></img>
                            <img className={item.hovered? "inline-block": " inline-block hidden"} src={arrowDownSign} width="18" onClick={()=>{this.onPushItemDown(index,indexItem)}}></img>
                        </div>
                 </div>))}

                 <form onSubmit={(e)=>this.onAddItem(e,index)}>
                    <input type="hidden" min="0" max="23" className="numberInput" value={this.state.newHour} onChange={(e)=>{this.setState({newHour:e.target.value})}}></input> 
                    <input type="hidden" min="0" max="59" className="numberInput" value={this.state.newMinute} onChange={(e)=>{this.setState({newMinute:e.target.value})}}></input><span className="pl-4"></span>
                    <input type ="hidden" className="bg-transparent" value={this.state.newDescription} onChange={(e)=>{this.setState({newDescription:e.target.value})}}></input>
                    <input src={plusSign} type="image" alt="Submit" width="18"></input>
                 </form> 

                 </div>
                   
            </div>))
        return(
            <div>
                <p>Harmonogram</p>
                {days}
                <div onClick={()=>{this.onAddNextDay()}}>
                    <p>Następny dzień</p>
                </div>
            </div>
        )
    }
}
export default Schedule