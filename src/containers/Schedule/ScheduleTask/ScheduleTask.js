import React, { Component } from 'react'
import { AiOutlineEdit, AiOutlineDown, AiOutlineDelete } from "react-icons/ai"
import { GrAdd } from "react-icons/gr";
import './ScheduleTask.css'
import ProgressBar from '../../../components/Schedule/ProgressBar/ProgressBar'
import ToDoListItem from '../../../components/Schedule/ToDoList/ToDoListItem/ToDoListItem'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

class ScheduleTask extends Component {
    state = {
        progressPercentage: '0%',
        showDetails: false,
        disabledTaskNameInput: 'disabled',
        taskName: this.props.name,
        taskStartDate: this.props.timestart,
        taskEndDate: this.props.timeend,
        tasks: this.props.tasks,
        save:false,
        taskid:this.props.taskid
    }

    componentDidMount() {
        console.log('PROPS')
        console.log(this.props)
        this.calculatePercentage()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        //this.setState({tasks:this.props.tasks})
        console.log(this.props)
        if(this.props.save && !prevProps.save){
            
            this.props.saveTask({
                parent: null,
                executor: this.props.executorid === null? null : {
                    personid:this.props.executorid
                },
                description: this.props.description,
                timestart: this.props.timestart,
                timeend: this.props.timeend,
                name:this.props.name,
                done:this.props.done,
                priority:this.props.priority
            })
            .then(res=>{
                this.setState({save:!this.state.save, taskid:res.data.taskid})
            })
            .catch(err=>{
                console.log(err)
            })
        }
        if(this.props.name !== prevProps.name){
            this.calculatePercentage()
        }
    }
    doneHandler(index ,isDone){
        let tasks = this.props.tasks.map((task, ind)=>{
            if(ind === index){
                task.done = isDone
            }
            return task
        })
        this.setState({tasks:tasks}, ()=>{this.calculatePercentage()})
    }
    changeModeHandler = () => {
        if(this.state.disabledTaskNameInput === 'disabled') {
            this.setState({ disabledTaskNameInput: null })
        } else {
            this.setState({ disabledTaskNameInput: 'disabled' })
        }
    }

    calculatePercentage = () => {
        let counter = 0
        for(let i = 0; i < this.props.tasks.length; i++) {
            if(this.props.tasks[i].done) {
                counter++
            }
        }
        this.setState({ progressPercentage: (counter / this.state.tasks.length) * 100 + '%' })
        
    }
    onNewTask(){
        this.props.addNewTask(this.props.index)
        this.setState(this.state)
    }
    render() {
        return(
            <div className="task-box">
                <AiOutlineDelete className="task-box-delete" onClick={()=>this.props.deleteTask(this.props.index, null)}></AiOutlineDelete>
                <AiOutlineEdit id="task-box-modify-mode" onClick={this.changeModeHandler}/>
                <input type="text" 
                    id="task-box-task-name" 
                    placeholder="Nazwa zadania" 
                    value={this.props.name} 
                    disabled={this.state.disabledTaskNameInput} 
                    onChange={e => this.props.updateComponent(this.props.index,null, { name: e.target.value})} 
                />
                <div className="task-box-time">
                    <p style={{ float: 'left' }}><b>Początek:</b></p>
                    <input id="task-box-start-date" 
                        type="date"
                        value={this.props.timestart.toISOString().substr(0,10)} 
                        disabled={this.state.disabledTaskNameInput} 
                        onChange={e => this.props.updateComponent(this.props.index, null,{timestart: new Date(e.target.value)})} 
                    />
                    <p style={{ marginLeft: '20px', float: 'left' }}><b>Koniec:</b></p>
                    <input type="date" 
                        id="task-box-end-date"
                        value={this.props.timeend.toISOString().substr(0,10)} 
                        disabled={this.state.disabledTaskNameInput} 
                        onChange={e => this.props.updateComponent(this.props.index, null,{timeend: new Date(e.target.value)})} 
                    />
                </div>
                <p><b>Stopień wykonania:</b></p>
                <ProgressBar percentage={this.state.progressPercentage} background="red"/>
                <AiOutlineDown style={{ margin: 'auto', fontSize: '300%', marginTop: '1%' }} onClick={e => this.setState({ showDetails: !this.state.showDetails})}/>
                <Aux>
                    {
                        this.state.showDetails? <p style={{ marginTop: '1%' }}><b>Lista zadań:</b></p> : null
                    }
                    {
                        this.props.tasks.map((task, ind) => (
                            <ToDoListItem key={ind}
                                updateComponent={this.props.updateComponent} 
                                parentIndex={this.props.index} 
                                deleteTask={this.props.deleteTask} 
                                onDone={this.doneHandler.bind(this)} 
                                index={ind} {...task} parentid={this.state.taskid} 
                                saveTask={this.props.saveTask} 
                                save={this.state.save} 
                                isActive={this.state.showDetails}></ToDoListItem>
                        ))
                    }
                    {
                        this.state.showDetails?
                        <div onClick={()=>this.onNewTask()}>
                            <GrAdd></GrAdd>
                        </div>:null
                    }
                </Aux>
                    
            </div>
        )
    }
}

export default ScheduleTask