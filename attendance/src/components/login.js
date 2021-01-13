import React, { useState, useContext } from "react";
// import { connect } from "react-redux";
// import { signIn } from "../actions";
// import { Field, reduxForm } from "redux-form";
import backend from "../apis/index";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = { email, password };
      const loggingIn = await backend.post("/api/user/login", userDetails);
      console.log(loggingIn.data.token);
      console.log(loggingIn.data);
      localStorage.setItem("auth-token", loggingIn.data.token);
      localStorage.setItem("userId", loggingIn.data.user.id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={submit}>
        <label>Enter Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Enter Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
