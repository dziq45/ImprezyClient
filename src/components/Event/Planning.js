import React, {Component} from 'react';
import ScheduleTask from '../../containers/Schedule/ScheduleTask/ScheduleTask';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import { IconContext } from 'react-icons'
import { GrAdd } from "react-icons/gr";
import './Planning.css'
import Aux from '../../hoc/Auxiliary/Auxiliary'

class Planning extends Component{
    state={
        tasks: [
            {
                taskName: 'zadanie 1',
                taskStartDate: "2012-3-23",
                taskEndDate: '22-3-2020',
                toDoList: [
                    {
                        content: 'pierwsze zadanie',
                        isDone: true,
                        description: 'fbvwu basfubw dfyuweo fivweifb wejkfbwuyf gvwyoufbwioef bvwyefvyow efvbwuy efvby uwefbi euwbfweiuf bweiuwfb weiufvw eifbweui fvweifvw eifvweiufvwe ifvwief',
                        person: 'Michał Kowalski'
                    },
                    {
                        content: 'drugie zadanie',
                        isDone: false,
                        description: 'fbvwu basfubwdfy uweofivwei fbwejkfbw uyfgvwyoufbwi oefbvwyef vyowe fvbwuye fvbyuwef bieuwbfw eiufbwei uwfbweiufv weifbw euifvw eifvweifvweiu fvweifvwief',
                        person: 'Andrzej Duda'
                    },
                    {
                        content: 'trzecie zadanie',
                        isDone: false,
                        description: 'fbvwubasfub wdfyuweofivweifb wejkfbwuyf gvwyoufbwioe fbvwyefvyowefvbwu yefvbyuwefbie uwbfweiufbw eiuwfbweiuf vweifbweuifv weifvweifvw eiufvwe ifvwief',
                        person: 'Robert Lewandowski'
                    }
                ]
            },
            {
                taskName: 'zadanie 2',
                taskStartDate: '23.02.2020',
                taskEndDate: '24.03.2020',
                toDoList: [
                    {
                        content: 'pierwsze zadanie',
                        isDone: false,
                        description: 'fbvwu basfubw dfyuweo fivweifb wejkfbwuyf gvwyoufbwioef bvwyefvyow efvbwuy efvby uwefbi euwbfweiuf bweiuwfb weiufvw eifbweui fvweifvw eifvweiufvwe ifvwief',
                        person: 'Michał Kowalski'
                    },
                    {
                        content: 'drugie zadanie',
                        isDone: false,
                        description: 'fbvwu basfubwdfy uweofivwei fbwejkfbw uyfgvwyoufbwi oefbvwyef vyowe fvbwuye fvbyuwef bieuwbfw eiufbwei uwfbweiufv weifbw euifvw eifvweifvweiu fvweifvwief',
                        person: 'Andrzej Duda'
                    },
                    {
                        content: 'trzecie zadanie',
                        isDone: false,
                        description: 'fbvwubasfub wdfyuweofivweifb wejkfbwuyf gvwyoufbwioe fbvwyefvyowefvbwu yefvbyuwefbie uwbfweiufbw eiuwfbweiuf vweifbweuifv weifvweifvw eiufvwe ifvwief',
                        person: 'Robert Lewandowski'
                    }
                ]
            }
        ]
    }

    componentDidMount(){
        
    }

    newTask = () => {
        this.setState({
            tasks: this.state.tasks.concat({
                taskName: '',
                taskStartDate: '',
                taskEndDate: '',
                toDoList: [
                    {
                        content: 'pierwsze zadanie',
                        isDone: false,
                        description: 'fbvwu basfubw dfyuweo fivweifb wejkfbwuyf gvwyoufbwioef bvwyefvyow efvbwuy efvby uwefbi euwbfweiuf bweiuwfb weiufvw eifbweui fvweifvw eifvweiufvwe ifvwief',
                        person: 'Michał Kowalski'
                    }
                ]
            })
        })
    }

    render(){
        return(
            <Aux>
                {this.state.tasks.map(task => (
                    <ScheduleTask
                        taskName={task.taskName}
                        taskStartDate={task.taskStartDate}
                        taskEndDate={task.taskEndDate}
                        toDoList={task.toDoList}
                    />
                ))}
                <div id="new-task-button-box" onClick={e => this.newTask()}>
                        <GrAdd id="new-task-button"/>
                </div>
                {/* <IconContext.Provider value={{ className: 'new-task-button' }}>

                </IconContext.Provider> */}
                
            </Aux>
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        eventId : state.event.activeEventId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCollaborators: (eventId) => dispatch(actions.setCollaborators(eventId))
    }
}
export default Planning