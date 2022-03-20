import React, { useEffect, useRef, useState } from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";
import { MarkEmailUnreadTwoTone } from "@mui/icons-material";

const Time = ({ start, end }) => {
  let startTime;
  let finishTime;

  if (start) {
    startTime = moment(start);
  } else {
    startTime = moment();
  }

  if (end) {
    finishTime = end.toDate();
  } else {
    finishTime = moment();
  }

  const format = (number) => (number < 10 ? "0" + number : number);
  let hindiTimeDiff = moment.preciseDiff(startTime, finishTime, true);

  let horaFormato = {
    seconds: format(hindiTimeDiff.seconds),
    minutes: format(hindiTimeDiff.minutes),
    hours: format(hindiTimeDiff.hours),
  };
  const [hindiCTime, setHindiCTime] = useState(horaFormato);

  const UpdateTime = setInterval(() => {
    // console.log("se disparó");

    if (start) {
      startTime = moment(start);
    } else {
      startTime = moment();
    }

    if (end) {
      finishTime = end.toDate();
    } else {
      finishTime = moment();
    }

    hindiTimeDiff = moment.preciseDiff(startTime, finishTime, true);

    horaFormato = {
      seconds: format(hindiTimeDiff.seconds),
      minutes: format(hindiTimeDiff.minutes),
      hours: format(hindiTimeDiff.hours),
    };
    setHindiCTime(horaFormato);
  }, 6000); // se dispara cada minuto :s

  // UpdateTime
  // clearInterval(UpdateTime);

  // setInterval(UpdateTime, 60000); //por minuto
  // ! ----------------------
  // ! EL FIEL
  let interval;
  const startTimer = () => {
    // TimeStamp
    let startTime;
    if (start) {
      startTime = moment(start);
    } else {
      startTime = moment();
    }

    if (end) {
      finishTime = end.toDate();
    } else {
      finishTime = moment();
    }
    // const startTime = start.toDate();

    interval = setInterval(() => {
      const now = moment();

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

      // setHoursDiff(hours);
      // setMinutesDiff(minutes);
      // setSecondsDiff(seconds);

      // let hindiTimeDiff = moment.preciseDiff(startTime, finishTime, true);

      let horaFormato = {
        seconds,
        minutes,
        hours,
      };

      setHindiCTime(horaFormato);
      // const [hindiCTime, setHindiCTime] = useState(horaFormato);
    }, 1000);
  };

  // ! este de abajo funcionaba!
  useEffect(() => {
    // if (start) {
    //   return startTimer();
    //   // return UpdateTime();
    // }
    startTimer();

    // }, [end, start]);
  }, []);
  // }, [end, start]);

  // ! ----------------------es el del hindú el de abajo
  // hindiCTime
  const { seconds, minutes, hours } = hindiCTime;
  const timeDiffHindi = hours + ":" + minutes + ":" + seconds;

  // ! ----------------------el de abajo sirve pero es el viejo, arriba es el del hindú

  return (
    <div className="order-cart--containertime">
      <Clock
        className={
          "order-cart--clock " +
          // (hoursDiff >= 1 || minutesDiff >= 1 ? "shake" : "")
          (hindiCTime.hours >= 1 || hindiCTime.minutes >= 1 ? "shake" : "")
        }
        width={16}
        height={16}
      />
      <h3
        className={
          "order-cart--minutes " +
          (hindiCTime.hours >= 1 || hindiCTime.minutes >= 1 ? "exceeds" : "")
        }
      >
        {timeDiffHindi}
      </h3>
    </div>
  );
};
export default Time;
