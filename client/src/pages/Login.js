import { Axios } from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";

export default function Login() {
  const userRef = useRef();
  const errRef = useRef();

  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:3001/login", {
        username: user,
        password: pwd,
      });
      console.log(response.data);
      setUser("");
      setPwd("");
      // setSuccess(true);
      console.log("first")
      navigate("/home");
    } catch (error) {
      if (error.response === 401) {
        console.log(error);
        setErrMsg("MisMatch Check Again");
      }
      // else{
      //   console.error(error);
      //   setErrMsg('Something went wrong try again');
      // }
      errRef.current.focus();
    }
  };

  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={userRef}
          required
          autoComplete="on"
          onChange={(e) => setUser(e.target.value)}
          value={user}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPwd(e.target.value)}
          value={pwd}
        />

        <button>Login</button>
      </form>
    </section>
  );
}
