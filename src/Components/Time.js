import React, { useEffect, useRef, useState } from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";
import { MarkEmailUnreadTwoTone } from "@mui/icons-material";

const Time = ({ start, end }) => {
  // HOLAA
  // console.log('tiempo finaliza?', end)
  // const [time, setTime] = useState('')
  const [hoursDiff, setHoursDiff] = useState("00");
  const [minutesDiff, setMinutesDiff] = useState("00");
  const [secondsDiff, setSecondsDiff] = useState("00");
  const [duration, setDuration] = useState(moment.duration(0));
  // if(end) { console.log('Ahora si tiene valor final! , ', end)}
  // console.log("duration, ", duration);
  // const b = moment("2022-03-11 15:31:15")
  useEffect(() => {
    const updateCounterDuration = () => {
      const startTime = moment(start.toDate());
      const now = moment();
      const timeDifference = now.diff(startTime, "seconds");
      // console.log("tiempo diff,", timeDifference);
      // _milliseconds
      setDuration(moment.duration(timeDifference, "seconds"));
    };

    const startTimer = () => setInterval(updateCounterDuration, 1000);

    if (end) {
      let timeDifference;
      if (!start) {
        timeDifference = moment.duration(0);
      } else {
        const startTime = moment(start.toDate());
        const endTime = moment(end.toDate());
        console.log("soy entime, ", endTime);
        timeDifference = endTime.diff(startTime, "seconds");

        setDuration(moment.duration(timeDifference, "seconds"));
        clearInterval();
      }
    } else if (start) {
      updateCounterDuration();
      return startTimer();
    }
  }, [start, end]);

  const formatedTimeDiff = moment
    .utc(duration.asMilliseconds())
    .format("HH:mm:ss");

  return (
    <div className="order-cart--containertime">
      <Clock
        className={
          "order-cart--clock " +
          (duration._milliseconds >= 60000 ? "shake" : "")
        }
        width={16}
        height={16}
      />
      <h3
        className={
          "order-cart--minutes " +
          (duration._milliseconds >= 60000 ? "exceeds" : "")
        }
      >
        {formatedTimeDiff}
      </h3>
    </div>
  );
};
export default Time;
