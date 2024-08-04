import React, {useState} from "react";
import '../css/countdown.css'
import CountdownNumber from './CountdownNumber'
export default function Countdown(){
    var now, timeLeft;
    const countDownDate = Date.parse('13 AUGUST 2024 00:00:00 GMT');
    
    const [days,setDays] = useState();
    const [hours,setHours] = useState();
    const [minutes,setMinutes] = useState();
    const [seconds,setSeconds] = useState();
    

    setInterval(() => {
        now = new Date().getTime();
        timeLeft = countDownDate - now;
        setDays(Math.floor(timeLeft / (1000 * 60 * 60 * 24)))
        setHours(Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
        setMinutes(Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)))
        setSeconds(Math.floor((timeLeft % (1000 * 60)) / 1000))
    },1000)



    return(
        <div id="countdownContainer">
            <CountdownNumber text='Days' number={days}/>
            <CountdownNumber text='Hours' number={hours}/>
            <CountdownNumber text='Minutes' number={minutes}/>
            <CountdownNumber text='Seconds' number={seconds}/> 
        </div>
    )
}