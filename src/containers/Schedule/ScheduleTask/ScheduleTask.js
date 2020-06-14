import React, { Component } from 'react'
import { AiOutlineEdit, AiOutlineDown } from "react-icons/ai"
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
        tasks:this.props.tasks,
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
        if(this.props.save){
            this.props.saveTask({
                parent: null,
                executor: this.props.executorid === null? null : {
                    personid:this.props.executorid
                },
                description: this.props.description,
                timestart: this.state.taskStartDate,
                timeend: this.state.taskEndDate,
                name:this.state.taskName,
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
        for(let i = 0; i < this.state.tasks.length; i++) {
            if(this.state.tasks[i].isDone) {
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
                <AiOutlineEdit id="task-box-modify-mode" onClick={this.changeModeHandler}/>
                <input type="text" 
                    id="task-box-task-name" 
                    placeholder="Nazwa zadania" 
                    value={this.state.taskName} 
                    disabled={this.state.disabledTaskNameInput} 
                    onChange={e => this.setState({ taskName: e.target.value})} 
                />
                <div className="task-box-time">
                    <p style={{ float: 'left' }}><b>Początek:</b></p>
                    <input id="task-box-start-date" 
                        type="date"
                        value={this.state.taskStartDate.toISOString().substr(0,10)} 
                        disabled={this.state.disabledTaskNameInput} 
                        onChange={e => this.setState({taskStartDate: new Date(e.target.value)})} 
                    />
                    <p style={{ marginLeft: '20px', float: 'left' }}><b>Koniec:</b></p>
                    <input type="date" 
                        id="task-box-end-date"
                        value={this.state.taskEndDate.toISOString().substr(0,10)} 
                        disabled={this.state.disabledTaskNameInput} 
                        onChange={e => this.setState({taskEndDate: new Date(e.target.value)})} 
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
                            <ToDoListItem key={ind} {...task} parentid={this.state.taskid} saveTask={this.props.saveTask} save={this.state.save} isActive={this.state.showDetails}></ToDoListItem>
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