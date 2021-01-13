import React, { useState, useContext } from "react";
import backend from "../apis/index";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("0");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        name,
        email,
        password,
        role,
      };
      await backend.post("/api/user/register", newUser);
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data);
    }
  };

  return (
    <React.Fragment>
      <div>
        <form onSubmit={submit}>
          <label>Enter Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <label>Enter Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <label>Enter Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            name="role"
            type="radio"
            checked={role === "0"}
            value="0"
            onChange={(e) => setRole(e.target.value)}
          />
          <label>Teacher</label>
          <input
            name="role"
            type="radio"
            checked={role === "1"}
            value="1"
            onChange={(e) => setRole(e.target.value)}
          />
          <label>Student</label>
          <button type="submit" value="Register">
            Register
          </button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Register;
