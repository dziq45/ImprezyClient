import React, { Component } from 'react'
import { AiOutlineEdit, AiOutlineDown } from "react-icons/ai"


import './ScheduleTask.css'
import ProgressBar from '../../../components/Schedule/ProgressBar/ProgressBar'
import ToDoListItem from '../../../components/Schedule/ToDoList/ToDoListItem/ToDoListItem'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

class ScheduleTask extends Component {
    state = {
        showDetails: false,
        disabledTaskNameInput: 'disabled',
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

    changeModeHandler = () => {
        if(this.state.disabledTaskNameInput === 'disabled') {
            this.setState({ disabledTaskNameInput: null })
        } else {
            this.setState({ disabledTaskNameInput: 'disabled' })
        }
    }



    render() {
        return(
            <div className="task-box">
                <AiOutlineEdit id="task-box-modify-mode" onClick={this.changeModeHandler}/>
                <input type="text" id="task-box-task-name" placeholder="Nazwa zadania" disabled={this.state.disabledTaskNameInput}/>
                <div className="task-box-time">
                    <p style={{ float: 'left' }}><b>Początek:</b></p><input id="task-box-start-date" type="date" disabled={this.state.disabledTaskNameInput}/>
                    <p style={{ marginLeft: '20px', float: 'left' }}><b>Koniec:</b></p><input type="date" id="task-box-end-date" disabled={this.state.disabledTaskNameInput}/>
                </div>
                <p><b>Stopień wykonania:</b></p>
                <ProgressBar percentage='40%' background="red"/>
                <AiOutlineDown style={{ margin: 'auto', fontSize: '300%', marginTop: '1%' }} onClick={e => this.setState({ showDetails: !this.state.showDetails })}/>
                {
                    this.state.showDetails
                    ?   <Aux>
                            <p style={{ marginTop: '1%' }}><b>Lista zadań:</b></p>
                            {
                                this.state.toDoList.map(toDoListItem => (
                                    <ToDoListItem
                                        toDoListItemContent={toDoListItem.content}
                                        toDoListItemIsDone={toDoListItem.isDone}
                                        toDoListItemDescription={toDoListItem.description}
                                        toDoListItemPerson={toDoListItem.person}
                                        disabled={this.state.disabledTaskNameInput}
                                    />
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