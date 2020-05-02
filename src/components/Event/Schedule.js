import React, {Component} from 'react';
import ScheduleItem from './ScheduleItem'
class Schedule extends Component{
    state={
        eachDay:[]
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
    renderItems(itemstable){
        return itemstable.map(item=>
            <ScheduleItem hour={item.hour} minute={item.minute} description={item.description}></ScheduleItem>)
    }
    render(){
        const days = this.state.eachDay.map(day=>(
            <div>
                {day.items.map(item=>(
                <ScheduleItem hour={item.hour} minute={item.minute} description={item.description}></ScheduleItem>))}
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