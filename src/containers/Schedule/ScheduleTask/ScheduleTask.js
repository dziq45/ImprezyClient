import React, { Component } from 'react'
import { AiOutlineEdit, AiOutlineDown } from "react-icons/ai"


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
        tasks: []
    }

    componentDidMount() {
        console.log(this.props)
        this.calculatePercentage()
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
                        value={this.state.taskStartDate} 
                        disabled={this.state.disabledTaskNameInput} 
                        onChange={e => this.setState({taskStartDate: e.target.value})} 
                    />
                    <p style={{ marginLeft: '20px', float: 'left' }}><b>Koniec:</b></p>
                    <input type="date" 
                        id="task-box-end-date"
                        value={this.state.taskEndDate} 
                        disabled={this.state.disabledTaskNameInput} 
                        onChange={e => this.setState({taskEndDate: e.target.value})} 
                    />
                </div>
                <p><b>Stopień wykonania:</b></p>
                <ProgressBar percentage={this.state.progressPercentage} background="red"/>
                <AiOutlineDown style={{ margin: 'auto', fontSize: '300%', marginTop: '1%' }} onClick={e => this.setState({ showDetails: !this.state.showDetails })}/>
                {
                    this.state.showDetails
                    ?   <Aux>
                            <p style={{ marginTop: '1%' }}><b>Lista zadań:</b></p>
                            {
                                this.state.tasks.map(task => (
                                    <ScheduleTask {...task}></ScheduleTask>
                                ))
                            }
                        </Aux>
                    : null
                } 
            </div>
        )
    }
}

export default ScheduleTask