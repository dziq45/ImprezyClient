import React, {Component} from 'react';
import ScheduleItem from './ScheduleItem'
class Schedule extends Component{
    state={
        eachDay:[],
        newHour:15,
        newMinute:20,
        newDescription:"Kolejne zdarzenie"
    }
    componentDidMount(){
        const date = new Date()
        const newState = 
            {eachDay:[
                {date: date,
                    items:[{
                        hour: 12,
                        minute:45,
                        description: "Występ jakiegoś zespołu"
                    },
                    {
                        hour: 14,
                        minute:20,
                        description: "Koniec występu"
                    }
                ]
            }
            ]}
        this.setState(newState)
        console.log(newState)
    }
    onAddItem=(e, dayIndex)=>{
        e.preventDefault()
        /*const clone = JSON.parse(JSON.stringify(this.state))
        clone.eachDay[dayIndex].items.push({
            hour:this.state.newHour,
            minute:this.state.newMinute,
            description:this.state.newDescription
        })*/
        const newEachDay = this.state.eachDay.map((thisDay, index)=>{
            if(index ===dayIndex){
                thisDay.items.push ({
                    hour:this.state.newHour,
                    minute:this.state.newMinute,
                    description:this.state.newDescription
                })
                return thisDay
            }
            else{
                return thisDay
            }
        })
        console.log(this.state)
        this.setState(newEachDay)
    }
    onEditValue=(e, dayIndex, itemIndex, type)=>{ //type = 0 - hour type = 1 - minute type = 2 - description
        e.preventDefault()
        const newEachDay = this.state.eachDay.map((thisDay, thisDayIndex)=>{
            if(thisDayIndex ===dayIndex){
                let newItems = thisDay.items.map((item,thisIndex)=>{
                    if(thisIndex === itemIndex){
                        switch(type){
                            case 0:
                                return{
                                    hour:e.target.value,
                                    minute:item.minute,
                                    description:item.description
                                }
                            case 1:
                                return{
                                    hour:item.hour,
                                    minute:e.target.value,
                                    description:item.description
                                }
                            case 2:
                                return{
                                    hour:item.hour,
                                    minute:item.minute,
                                    description:e.target.value
                                }
                        }
                    }
                })
                return thisDay
            }
            else{
                return thisDay
            }
        })
        this.setState(newEachDay)
    }
    render(){
        const days = this.state.eachDay.map((day,index)=>(
            <div>
                <p>{day.date.getFullYear() + '.' + day.date.getMonth() + '.' + day.date.getDate()}</p>
                {day.items.map((item, indexItem)=>(
                <div>
                    <input className="bg-transparent w-5" type="text" value={item.hour} onChange={(e)=>this.onEditValue(e,index,indexItem,0)}></input>: 
                    <input className="bg-transparent w-5" value={item.minute} onChange={(e)=>this.onEditValue(e,index,indexItem,1)}></input><span className="pl-4"></span>
                    <input className="bg-transparent" value={item.description} onChange={(e)=>this.onEditValue(e,index,indexItem,2)}></input>
                 </div>))}
                 <form onSubmit={(e)=>this.onAddItem(e,index)}>
                    <input className="bg-transparent w-5" ></input>: 
                    <input className="bg-transparent w-5"></input><span className="pl-4"></span>
                    <input className="bg-transparent"></input>
                    <input type="submit"></input>
                 </form>   
            </div>))
        return(
            <div>
                <p>Harmonogram</p>
                {days}
            </div>
        )
    }
}
export default Schedule