import React, { useEffect, useRef, useState } from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";
import { MarkEmailUnreadTwoTone } from "@mui/icons-material";

const Time = ({ start, end }) => {
  console.log("tiempo inicia?", start);
  console.log("tiempo finaliza?", end);
  // const [time, setTime] = useState('')
  const [hoursDiff, setHoursDiff] = useState("00");
  const [minutesDiff, setMinutesDiff] = useState("00");
  const [secondsDiff, setSecondsDiff] = useState("00");

  // if(end) { console.log('Ahora si tiene valor final! , ', end)}

  // const b = moment("2022-03-11 15:31:15");

  let interval;

  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setIsVisible(false);
    // });

    const interval = setInterval(() => {
      let startTime;
      const now = moment();
      if (start) {
        startTime = start.toDate();
      } else {
        startTime = moment();
      }
      // const startTime = start.toDate();
      // const now = moment();

      let timeDifference;

      if (end) {
        const endTime = end.toDate();
        timeDifference = moment.preciseDiff(startTime, endTime, true);
      } else {
        timeDifference = moment.preciseDiff(startTime, now, true);
      }

      let { seconds, minutes, hours } = timeDifference;

      seconds = seconds < 10 ? "0" + seconds : seconds;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      hours = hours < 10 ? "0" + hours : hours;

      setHoursDiff(hours);
      setMinutesDiff(minutes);
      setSecondsDiff(seconds);
    }, 1000);

    return () => {
      clearTimeout(interval);
    };
  }, []);

  // const startTimer = () => {
  //   // TimeStamp
  //   const startTime = start.toDate();

  //   interval = setInterval(() => {
  //     const now = moment();

  //     let timeDifference;

  //     if (end) {
  //       const endTime = end.toDate();
  //       timeDifference = moment.preciseDiff(startTime, endTime, true);
  //     } else {
  //       timeDifference = moment.preciseDiff(startTime, now, true);
  //     }

  //     let { seconds, minutes, hours } = timeDifference;

  //     seconds = seconds < 10 ? "0" + seconds : seconds;
  //     minutes = minutes < 10 ? "0" + minutes : minutes;
  //     hours = hours < 10 ? "0" + hours : hours;

  //     setHoursDiff(hours);
  //     setMinutesDiff(minutes);
  //     setSecondsDiff(seconds);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //         if(isMounted ){
  //           startTimer(); // no more error
  //         }
  //      return () => {
  //       isMounted = false;
  //       };
  //   }, []);

  // ! este de abajo funcionaba!
  // useEffect(() => {
  //   if (start) {
  //     return startTimer();
  //   }
  //   // startTimer()
  //   // }, [end, start]);
  // }, [end, start]);

  let timeDiff = "00:00:00";
  if (start) {
    timeDiff = hoursDiff + ":" + minutesDiff + ":" + secondsDiff;
  }
  // const timeDiff = hoursDiff + ":" + minutesDiff + ":" + secondsDiff;

  return (
    <div className="order-cart--containertime">
      <Clock
        className={
          "order-cart--clock " +
          (hoursDiff >= 1 || minutesDiff >= 1 ? "shake" : "")
        }
        width={16}
        height={16}
      />
      <h3
        className={
          "order-cart--minutes " +
          (hoursDiff >= 1 || minutesDiff >= 1 ? "exceeds" : "")
        }
      >
        {timeDiff}
      </h3>
    </div>
  );
};
export default Time;
