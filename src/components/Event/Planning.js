import React, {Component} from 'react';
import ScheduleTask from '../../containers/Schedule/ScheduleTask/ScheduleTask';
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index'
import { IconContext } from 'react-icons'
import { GrAdd } from "react-icons/gr";
import './Planning.css'
import Aux from '../../hoc/Auxiliary/Auxiliary'
import axios from 'axios';
import {apiCaller} from '../../apiCaller'

let listId = null
class Planning extends Component{
    state={
        tasks: [],
        save:false,
        savingEnabled:true
    }
    componentDidMount(){
        listId = this.props.toDoListId
        console.log(`this.listId = ${this.listId}`)
        console.log(this.props.toDoListId)
        apiCaller().get('/todolisttask/getbytodolist/' + this.props.toDoListId)
        .then(res=>{
            console.log('siema')
            let mainTasks = []
            for(let task of res.data){
                if(task.parent === null){
                    let newMainTask = {
                        taskid:task.taskid,
                        name:task.name,
                        executorid:task.executor === null? null : task.executor.eventPersonId.personid,
                        description:task.description,
                        priority:task.priority,
                        showDetailsView:false,
                        done:task.done,
                        selectedOption:{
                            value:null,
                            label:null
                        },
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
                    executorid:task.executor === null? null : task.executor.eventPersonId.personid,
                    description:task.description,
                    priority:task.priority,
                    done:task.done,
                    timestart:new Date(task.timestart),
                    timeend: new Date(task.timeend),
                    selectedOption:{
                        value:task.executor === null? null : task.executor.eventPersonId.personid,
                        label:null
                    },
                    tasks:[]
                }
                console.log('Nowy task wczytuję')
                console.log(newTask)
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
            apiCaller().post('/todolisttask/add',tt)
            .then(res=>{
                resolve(res)
                console.log('Task z bazy zapisany')
                console.log(res.data)
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
                    selectedOption:{
                        value:null,
                        label:null
                    },
                    timestart: new Date(),
                    timeend: new Date(),
                    tasks: []
                })
            }
        })
    }
    handleSaving(){
        console.log('saving')
        this.setState({savingEnabled:false})
        setTimeout(()=>{
            this.setState({savingEnabled:true, tasks:[]}, ()=>this.componentDidMount())
        },2000)
        this.deleteTasks()
    }
    deleteTask(index, chIndex){
        if(chIndex === null){
            console.log('Usuwanie ')
            let tasks = this.state.tasks.filter((task, ind)=>index !== ind)
            console.log(tasks)
            this.setState({tasks : tasks})
        }
        else{
            let tasks = this.state.tasks.map((task, ind)=>{
                if(index === ind){
                    task.tasks = task.tasks.filter((child, childIndex)=>childIndex !== chIndex)
                }
                return task
            })
            this.setState({tasks : tasks})
        }
    }
    updateComponent(index,childIndex, task){
        if(childIndex == null){
            let newTasks = this.state.tasks.map((item,itemIndex)=>{
                if(index === itemIndex){
                    let newTask = Object.assign(item, task)
                    console.log('newTask')
                    console.log(newTask)
                    return newTask
                }
                else{
                    return item
                }
            })
            this.setState({tasks:newTasks})
        }
        else{
            let newTasks = this.state.tasks.map((item,itemIndex)=>{
                if(index === itemIndex){
                    item.tasks = item.tasks.map((child, childin)=>{
                        if(childIndex == childin){
                            let newTask = Object.assign(child, task)
                            return newTask
                        }
                        return child
                    })
                }
                return item
            })
            this.setState({tasks:newTasks})
        }
    }
    deleteTasks(){
        apiCaller().delete('/todolist/deletetasks/' + this.props.toDoListId)
        .then(res=>{
            this.save()
            //for()
        })
    }
    async saveTask2(){

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
                    <ScheduleTask updateComponent={this.updateComponent.bind(this)} key={index} deleteTask={this.deleteTask.bind(this)} {...task} addNewTask={this.addNewTask.bind(this)} index={index} parentid={null} save={this.state.save} saveTask={this.saveTask}/>
                ))}
                <div id="new-task-button-box" onClick={e => this.newTask()}>
                        <GrAdd id="new-task-button"/>
                </div>
                <div className="saveButton p-2 w-1/6 ml-32 hover:bg-gray-600" onClick={()=>{this.state.savingEnabled && this.handleSaving()}}>Zapisz</div>                
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