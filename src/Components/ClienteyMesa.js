import React, { useState } from "react";

const ClienteyMesa = () => {
  const [clientName, setClientName] = useState("");
  return (
    <>
      <input
        id="client"
        className="client--input"
        placeholder="Client Name"
        onChange={(ev) => setClientName(ev.target.value)}
      ></input>
    </>
  );
};
