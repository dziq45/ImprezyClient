import React, {Component} from 'react';
import ScheduleTask from '../../containers/Schedule/ScheduleTask/ScheduleTask';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import { IconContext } from 'react-icons'
import { GrAdd } from "react-icons/gr";
import './Planning.css'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import axios from 'axios';

let listId = null
class Planning extends Component{
    state={
        tasks: [],
        save:false
    }
    componentDidMount(){
        listId = this.props.toDoListId
        console.log(`this.listId = ${this.listId}`)
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
                        showDetailsView:false,
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
            this.setState({tasks: mainTasks})
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
    saveTask(task){
        let tt = {...task}
        tt.toDoList={
            todolistid:listId
        }
        console.log('task')
        console.log(tt)
        //console.log(`dodaje do ${this.props.toDoListId}`)
        return new Promise((resolve, reject)=>{
            axios.post('/todolisttask/add',tt)
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
        
    }
    addNewTask(index){
        console.log(this.state)
        let newTasks = this.state.tasks.map((item, itemIndex)=>{
            if(index === itemIndex){
                item.tasks.push({
                    taskid:null,
                    name: '',
                    description:'',
                    executorid:null,
                    priority:null,
                    done:false,
                    timestart: new Date(),
                    timeend: new Date(),
                    tasks: []
                })
            }
        })
    }
    handleSaving(){
        this.deleteTasksStart()
        this.save()
    }
    deleteTasksStart(){
        for(let task of this.state.tasks){
            this.deleteTasks(task)
        }
    }
    deleteTasks(task){
        for(let temp of task.tasks){
            this.deleteTasks(temp)
        }
        if(task.taskid !== null){
            axios.delete('/todolisttask/delete/' + task.taskid)
            .then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err.reponse)
            })
        }
    }
    newTask = () => {
        this.setState({
            tasks: this.state.tasks.concat({
                taskid:null,
                name: '',
                description:'',
                executorid:null,
                priority:null,
                done:false,
                timestart: new Date(),
                timeend: new Date(),
                tasks: []
            })
        })
    }
    save(){
        this.setState({save:true})
        setTimeout(()=>{
            this.setState({save:false})
        }, 200)
    }
    render(){
        return(
            <Aux>
                {this.state.tasks.map((task, index) => (
                    <ScheduleTask key={index} {...task} addNewTask={this.addNewTask.bind(this)} index={index} parentid={null} save={this.state.save} saveTask={this.saveTask}/>
                ))}
                <div id="new-task-button-box" onClick={e => this.newTask()}>
                        <GrAdd id="new-task-button"/>
                </div>
                <div onClick={()=>{this.handleSaving()}}>Zapisz</div>
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