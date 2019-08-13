import React, {Component} from 'react';
import './App.css';

class Clock extends Component{
    constructor(props){
        super(props);
        this.state = {
            time: 0,
            inputMinute: '',
            inputSecond: '',
            ticking: false
        }
        this.intervalId = 0;
        this.handleMinute = this.handleMinute.bind(this);
        this.handleSecond = this.handleSecond.bind(this);
        this.start = this.start.bind(this);
        this.setTime = this.setTime.bind(this);
        this.clearTime = this.clearTime.bind(this);
        this.stop = this.stop.bind(this);
    }
    handleMinute(e){
        this.setState({inputMinute:e.target.value});
    }
    handleSecond(e){
        this.setState({inputSecond:e.target.value});
    }
    setTime(){
        let m = 0;
        let s = 0;
        if (this.state.inputMinute) {m = parseInt(this.state.inputMinute);}
        if (this.state.inputSecond) {s = parseInt(this.state.inputSecond);}
        this.setState({
            time: m * 60 + s,
        });
    }
    clearTime(){
        clearInterval(this.intervalId);
        this.setState({
            inputMinute: '',
            inputSecond: '',
            time: 0,
            ticking: false
        });
    }
    start(){
        if (!this.state.ticking) {
            this.intervalId = setInterval(()=>{
                if (this.state.time > 0) {
                    this.setState({
                        time: this.state.time - 1,
                        ticking: true
                    });}
            }, 1000);
        }
    }
    stop(){
        clearInterval(this.intervalId);
        this.setState({ticking: false});
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    timeFormat(t){
        console.log(t);
        let s = t % 60;
        let m = (t - t % 60) / 60;
        if (m < 10) {m = '0' + m;}
        if (s < 10) {s = '0' + s;}
        return `${m} : ${s}`;
    }
    render(){
        return (
            <div className="outer">
                <h2>Countdown Clock</h2>
                <h3>Input your desired time</h3>
                <input className="inputT" value={this.state.inputMinute} onChange={this.handleMinute} placeholder="Minute" required />
                <input className="inputT" value={this.state.inputSecond} onChange={this.handleSecond} placeholder="Second" required />
                <input className="button" type="button" onClick={this.setTime} value="Set Time" />
                <input className="button" type="button" onClick={this.clearTime} value="Reset" />
                
                <div id="number">
                    {this.timeFormat(this.state.time)}
                </div>
                <input className="button" type="button" onClick={this.start} value="Start" />
                <input className="button" type="button" onClick={this.stop} value="Stop" />
            </div>
        );
    }
}

export default Clock;