import React, {useEffect, useRef, useState} from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";

const Time = ({ start, end, timeX}) => {
 
  // console.log('time component , ', start)
  // console.log("time component , ", start.toDate());
  
  // const [time, setTime] = useState('')
  const [hoursDiff, setHoursDiff] = useState()
  const [minutesDiff, setMinutesDiff] = useState()
  const [secondsDiff, setSecondsDiff] = useState()

  // const b = moment("2022-03-11 15:31:15");
  
  // let {hours, minutes, seconds} = difference;
  
  let interval;

  const startTimer = () => {
    
    // TimeStamp
    const startTime = moment("2022-03-10 13:31:12");

    interval = setInterval(() => {
      const now = moment();
      // const difference = moment.preciseDiff(startTime, now, true);
      const {seconds, minutes, hours} = moment.preciseDiff(startTime, now, true);

      // if(tiempoFinalExiste) // Para el contador{
        // clearInterval(interval.current)
      // }

  const secondsFormat = seconds < 10 ? "0" + seconds : seconds
  const minutesFormat = minutes < 10 ? "0" + minutes : minutes
  const hoursFormat = hours < 10 ? "0" + hours : hours

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
      // handleDiffTime()
      // setInterval(handleDiffTime, 1000)
      // setInterval(handleDiffTime, 10000)
      // return time
    })
    // }, [time, current])
   // const secondsDiff = seconds < 10 ? "0" + seconds : seconds
  // const minutesDiff = minutes < 10 ? "0" + minutes : minutes
  // const hoursDiff = hours < 10 ? "0" + hours : hours
    
    // const difference = moment.preciseDiff(a, b, true);

    
    // start.toDate()
  

    // setHoursDiff(hours)
    // setMinutesDiff(minutes)
    // setSecondsDiff(seconds)
  
    const timeDiff = hoursDiff +':' + minutesDiff + ':' + secondsDiff
    // const timeDiff = hours +':' + minutes + ':' + seconds
    // setTime(timeDiff);
  // },1000)
  
    // const diff = () => {
    // const timeDiff = hoursDiff +':' + minutesDiff + ':' + secondsDiff
    
    // }
   
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
