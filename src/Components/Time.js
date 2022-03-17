import React, {useEffect, useRef, useState} from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";

const Time = ({ start, end}) => {
  
  // const [time, setTime] = useState('')
  const [hoursDiff, setHoursDiff] = useState()
  const [minutesDiff, setMinutesDiff] = useState()
  const [secondsDiff, setSecondsDiff] = useState()

  // const b = moment("2022-03-11 15:31:15");
  
  let interval;

  const startTimer = () => {
    
    // TimeStamp
    const startTime = start.toDate();

    interval = setInterval(() => {
      const now = moment();
      let {seconds, minutes, hours} = moment.preciseDiff(startTime, now, true);

      // const {seconds, minutes, hours} = moment.preciseDiff(startTime, now, true);
      
      // if(tiempoFinalExiste) // Para el contador{
        // clearInterval(interval.current)
        // }
        
        seconds = seconds < 10 ? "0" + seconds : seconds
        minutes = minutes < 10 ? "0" + minutes : minutes
        hours = hours < 10 ? "0" + hours : hours
        
        const prueba = moment(hours+' '+minutes+' '+hours, "hh:mm:ss")
        console.log('FORMATEANDO', prueba)

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
   
   
  // !-----

  return (
    <div className="order-cart--containertime">
      <Clock className="order-cart--clock" width={16} height={16} />
      {/* <h3 className="order-cart--minutes">{"00:00:00"}</h3> */}
      <h3 className="order-cart--minutes">{timeDiff}</h3>
      {/* <h3 className="order-cart--minutes">{time}</h3> */}
      {/* <h3 className="order-cart--minutes">{timeX}</h3> */}
    </div>
  );
};

export default Time;
