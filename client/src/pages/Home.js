import React, { useState,useEffect } from "react";
import Axios from "axios";

export default function Home() {
  const [sid, setId] = useState("");
  const [sname, setName] = useState("");

  const submitName = () => {
    Axios.post("http://localhost:3001/api/insert", {
      iduploadFile: sid,
      FileName: sname,
    }).then(()=>{
      alert("Successful insert");
    });
  };

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setId(e.target.value);
        }}
      ></input>
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <button onClick={submitName}>Submit</button>
    </div>
  );
}
