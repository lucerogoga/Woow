import React, {useEffect, useRef, useState} from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";
import { MarkEmailUnreadTwoTone } from "@mui/icons-material";

const Time = ({ start, end}) => {
  
  // const [time, setTime] = useState('')
  const [hoursDiff, setHoursDiff] = useState('00')
  const [minutesDiff, setMinutesDiff] = useState('00')
  const [secondsDiff, setSecondsDiff] = useState('00')

  // const b = moment("2022-03-11 15:31:15");
  
  let interval;

  const startTimer = () => {
    
    // TimeStamp
    const startTime = start.toDate();

    interval = setInterval(() => {
      const now = moment();
      const ayudita = moment.preciseDiff(startTime, now, true);
      let {seconds, minutes, hours} =  ayudita
      // let {seconds, minutes, hours} = moment.preciseDiff(startTime, now, true);

      // const {seconds, minutes, hours} = moment.preciseDiff(startTime, now, true);
      
      // if(tiempoFinalExiste) // Para el contador{
        // clearInterval(interval.current)
        // }

        seconds = seconds < 10 ? "0" + seconds : seconds
        minutes = minutes < 10 ? "0" + minutes : minutes
        hours = hours < 10 ? "0" + hours : hours
        
        // const prueba = moment(hours+' '+minutes+' '+hours, "hh:mm:ss")
        // console.log('FORMATEANDO', prueba)

    // setHoursDiff(hoursFormat)
    // setMinutesDiff(minutesFormat)
    // setSecondsDiff(secondsFormat)
    setHoursDiff(hours)
    setMinutesDiff(minutes)
    setSecondsDiff(seconds)

    },1000)
    
    }

    useEffect(() => {
    
      startTimer()
    })
    
    const timeDiff = hoursDiff +':' + minutesDiff + ':' + secondsDiff
   

  return (
    <div className="order-cart--containertime">
      <Clock className={"order-cart--clock " + (hoursDiff >= 1 || minutesDiff>=1 ? "shake" : "")}  width={16} height={16} />
      <h3  className={"order-cart--minutes " + (hoursDiff >= 1 || minutesDiff>=1 ? "exceeds" : "")}>{timeDiff}</h3>
    </div>
  );
};
export default Time;
