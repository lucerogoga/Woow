import React, {useEffect, useState} from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";

const Time = ({ start, end }) => {
  // Step 1: Create a function to calculate time difference
  // .toDate()
  // console.log('time component , ', start)
  // console.log("time component , ", start.toDate());
  const [time, setTime] = useState('')

  const current = moment();


  const handleDiffTime = () => {
    const a = moment("2022-03-10 13:31:12");
    // const b = moment("2022-03-11 15:31:15");
  
    // ! el actual!
  
    const difference = moment.preciseDiff(a, current, true);
    // const difference = moment.preciseDiff(a, b, true);
  
    let {hours, minutes, seconds} = difference;
  
    seconds = seconds < 10 ? "0" + seconds : seconds
    minutes = minutes < 10 ? "0" + minutes : minutes
    hours = hours < 10 ? "0" + hours : hours
    console.log(hours,':',minutes,':',seconds)
  
    // return hours +':' + minutes + ':' + seconds
    const timeDiff = hours +':' + minutes + ':' + seconds
    setTime(timeDiff);
  }
  useEffect(() => {
    
    handleDiffTime()
    // setInterval(handleDiffTime, 10000)
    // setInterval(handleDiffTime, 10000)
    // return time
  }, [time, current])
  // const diff = () => {

    

  // }

 
  
   
  // console.log('el tiempo es con function: ', diff)
  console.log('el tiempo es: ', time)
  // console.log('el tiempo es: ', timeDiff)
  // !-----

  return (
    <div className="order-cart--containertime">
      <Clock className="order-cart--clock" width={16} height={16} />
      {/* <h3 className="order-cart--minutes">{"00:00:00"}</h3> */}
      <h3 className="order-cart--minutes">{time}</h3>
    </div>
  );
};

export default Time;
