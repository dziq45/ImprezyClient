import React, { Component } from 'react'

class Counter extends Component{
    state={
        days:0,
        hours:0,
        minutes:0,
        seconds:0
    }
    componentDidMount(){
        setInterval(()=>{
            let currentDate = new Date()
            let distance = this.props.eventDate.getTime() - currentDate.getTime()
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            this.setState({days:days, hours:hours, minutes:minutes, seconds:seconds})
        }, 1000)
    }
    render(){
        return(
            <div className="dateElementsContainer">
                <div className="dateElementContainer">
                    <p>{this.state.days < 10? '0' + this.state.days : this.state.days}</p>
                    <p>Days</p>
                </div>
                <div className="dateElementContainer">
                    <p>{this.state.hours < 10? '0' + this.state.hours : this.state.hours}</p>
                    <p>Hours</p>
                </div>
                <div className="dateElementContainer">
                    <p>{this.state.minutes < 10? '0' + this.state.minutes : this.state.minutes}</p>
                    <p>Minutes</p>
                </div>
                <div className="dateElementContainer">
                    <p>{this.state.seconds <  10? '0' + this.state.seconds : this.state.seconds}</p>
                    <p>Seconds</p>
                </div>
            </div>
        )
    }
}
export default Counter