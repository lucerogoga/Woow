import React from "react";
import "../Assets/Time.css";
import { ReactComponent as Clock } from "../Assets/icons/clock.svg";
import moment from "moment";
import "moment-precise-range-plugin";

const Time = ({ start, end }) => {
  // Step 1: Create a function to calculate time difference
  // .toDate()
  // console.log('time component , ', start)
  // console.log("time component , ", start.toDate());
  // const diff = () => {
  const a = moment("2022-03-10 13:31:12");
  const b = moment("2022-03-11 15:31:15");

  // ! el actual!
  // const current = moment();

  const diferenciaa = moment.preciseDiff(a, b, true);
  // const diferencia = JSON.stringify(moment.preciseDiff(a, b, true));
  // var duration = diferenciaa(diferenciaa, "HH:mm:ss a");
  // console.log("salvame diferencia formato, ", duration);
  console.log("salvame diferencia json, ", diferenciaa);

  const {hours} = diferenciaa;
  // const {hours, minutes, seconds} = diferenciaa;
  // console.log('horas: ', hours, ' - minutos: ', minutes, ' - segundos: ' , seconds)
  console.log('horas: ', hours)
  // !-----

  return (
    <div className="order-cart--containertime">
      <Clock className="order-cart--clock" width={16} height={16} />
      <h3 className="order-cart--minutes">{"00:00:00"}</h3>
      {/* <h3 className="order-cart--minutes">{duration}</h3> */}
    </div>
  );
};

export default Time;
