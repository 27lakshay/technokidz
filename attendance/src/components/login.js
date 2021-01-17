import React, { useState, useContext } from "react";
import backend from "../apis/index";
import history from "../history";

import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
// import LoginForm from "./loginForm";
import UserContext from "../context/context";
import image from "../images/2.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("0");

  const { userData, setUserData } = useContext(UserContext);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const userDetails = { email, password, role };
      const loggingIn = await backend.post("/api/login/", userDetails);
      localStorage.setItem("auth-token", loggingIn.data.token);
      setUserData({
        isLoggedIn: true,
      });
      history.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <h1>Login Page</h1>
      </Row>
      <Row>
        <Col
          xs={12}
          md={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <img
            src={image}
            style={{ width: "100%", height: "auto", margin: "none" }}
          />
        </Col>
        <Col xs={12} md={6}>
          <Form onSubmit={submit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                inline
                name="role"
                label="Teacher"
                type="radio"
                checked={role === "0"}
                value="0"
                onChange={(e) => setRole(e.target.value)}
              />
              <Form.Check
                inline
                name="role"
                label="Student"
                type="radio"
                checked={role === "1"}
                value="1"
                onChange={(e) => setRole(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
