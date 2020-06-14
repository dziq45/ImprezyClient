import React, {Component} from 'react';
import ScheduleTask from '../../containers/Schedule/ScheduleTask/ScheduleTask';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import { IconContext } from 'react-icons'
import { GrAdd } from "react-icons/gr";
import './Planning.css'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import axios from 'axios';

class Planning extends Component{
    state={
        tasks: [
            {
                taskName: 'zadanie 1',
                taskStartDate: "2012-3-23",
                taskEndDate: '22-3-2020',
                toDoList: [
                    {
                        taskName: 'pierwsze zadanie',
                        isDone: true,
                        description: 'fbvwu basfubw dfyuweo fivweifb wejkfbwuyf gvwyoufbwioef bvwyefvyow efvbwuy efvby uwefbi euwbfweiuf bweiuwfb weiufvw eifbweui fvweifvw eifvweiufvwe ifvwief',
                        person: 'Michał Kowalski'
                    },
                    {
                        taskName: 'drugie zadanie',
                        isDone: false,
                        description: 'fbvwu basfubwdfy uweofivwei fbwejkfbw uyfgvwyoufbwi oefbvwyef vyowe fvbwuye fvbyuwef bieuwbfw eiufbwei uwfbweiufv weifbw euifvw eifvweifvweiu fvweifvwief',
                        person: 'Andrzej Duda'
                    },
                    {
                        taskName: 'trzecie zadanie',
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
                        taskName: 'pierwsze zadanie',
                        isDone: false,
                        description: 'fbvwu basfubw dfyuweo fivweifb wejkfbwuyf gvwyoufbwioef bvwyefvyow efvbwuy efvby uwefbi euwbfweiuf bweiuwfb weiufvw eifbweui fvweifvw eifvweiufvwe ifvwief',
                        person: 'Michał Kowalski'
                    },
                    {
                        taskName: 'drugie zadanie',
                        isDone: false,
                        description: 'fbvwu basfubwdfy uweofivwei fbwejkfbw uyfgvwyoufbwi oefbvwyef vyowe fvbwuye fvbyuwef bieuwbfw eiufbwei uwfbweiufv weifbw euifvw eifvweifvweiu fvweifvwief',
                        person: 'Andrzej Duda'
                    },
                    {
                        taskName: 'trzecie zadanie',
                        isDone: false,
                        description: 'fbvwubasfub wdfyuweofivweifb wejkfbwuyf gvwyoufbwioe fbvwyefvyowefvbwu yefvbyuwefbie uwbfweiufbw eiuwfbweiuf vweifbweuifv weifvweifvw eiufvwe ifvwief',
                        person: 'Robert Lewandowski'
                    }
                ]
            }
        ]
    }

    componentDidMount(){
        console.log(this.props.toDoListId)
        axios.get('/todolisttask/getbytodolist/' + this.props.toDoListId)
        .then(res=>{
            console.log('siema')
            let mainTasks = []
            for(let task of res.data){
                if(task.parent === null){
                    let newMainTask = {
                        taskid:task.taskid,
                        name:task.name,
                        executorid:task.executor === null? null : task.executor.personid,
                        description:task.description,
                        priority:task.priority,
                        done:task.done,
                        timestart:new Date(task.timestart),
                        timeend: new Date(task.timeend),
                        tasks:[]
                    }
                    mainTasks.push(newMainTask)
                    this.parseTasksToState(newMainTask, res.data)
                }
            }
            console.log(mainTasks)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    parseTasksToState(parentTask, rest){
        for(let task of rest){
            if(task.parent !== null && task.parent.taskid == parentTask.taskid){
                let newTask = {
                    taskid:task.taskid,
                    name:task.name,
                    executorid:task.executor === null? null : task.executor.personid,
                    description:task.description,
                    priority:task.priority,
                    done:task.done,
                    timestart:new Date(task.timestart),
                    timeend: new Date(task.timeend),
                    tasks:[]
                }
                parentTask.tasks.push(newTask)
                this.parseTasksToState(newTask, rest)
            }
        }
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
                    <ScheduleTask {...task}/>
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
        toDoListId : state.event.toDoListId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setCollaborators: (eventId) => dispatch(actions.setCollaborators(eventId))
    }
}
export default connect(mapStateToProps)(Planning)