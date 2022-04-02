import React, { useEffect, useState } from "react";
import "../Assets/Time.css";
//Component
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
//Libraries
import moment from "moment";
import "moment-precise-range-plugin";

const Time = ({ start, end, status }) => {
  const [duration, setDuration] = useState(moment.duration(0));
  useEffect(() => {
    const updateCounterDuration = () => {
      const startTime = moment(start.toDate());
      const now = moment();
      const timeDifference = now.diff(startTime, "seconds");
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

  // 60000 ms = 1 minute
  // 20000 ms = 20 seconds
  return (
    <div className="order-cart--containertime">
      <Clock
        className={
          "order-cart--clock " +
          (duration._milliseconds >= 20000 && status === "Cooking"
            ? "shake "
            : "") +
          (duration._milliseconds >= 20000 && status !== "Cooking"
            ? "light-on"
            : "")
        }
        width={16}
        height={16}
      />
      <h3
        className={
          "order-cart--minutes " +
          (duration._milliseconds >= 20000 && status === "Cooking"
            ? "exceeds "
            : "") +
          (duration._milliseconds >= 20000 && status !== "Cooking"
            ? "inactive"
            : "")
        }
      >
        {formatedTimeDiff}
      </h3>
    </div>
  );
};
export default Time;
