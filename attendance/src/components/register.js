import React, { useState, useContext } from "react";
import backend from "../apis/index";
import history from "../history";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import image from "../images/1.jpg";

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
      function determineUser() {
        if (role === "0") return "teacher";
        if (role === "1") return "student";
      }
      console.log(role);
      await backend.post(`/api/register/${determineUser(role)}`, newUser);
      history.push("/login");
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data);
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
        <h1>Register Page</h1>
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
            <Form.Group controlId="formBasicName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Fullname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Text className="text-muted"></Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
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
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    // <React.Fragment>
    //   <div>
    //     <form onSubmit={submit}>
    //       <label>Enter Name</label>
    //       <input value={name} onChange={(e) => setName(e.target.value)} />
    //       <label>Enter Email</label>
    //       <input value={email} onChange={(e) => setEmail(e.target.value)} />
    //       <label>Enter Password</label>
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       <br />
    //       <input
    //         name="role"
    //         type="radio"
    //         checked={role === "0"}
    //         value="0"
    //         onChange={(e) => setRole(e.target.value)}
    //       />
    //       <label>Teacher</label>
    //       <input
    //         name="role"
    //         type="radio"
    //         checked={role === "1"}
    //         value="1"
    //         onChange={(e) => setRole(e.target.value)}
    //       />
    //       <label>Student</label>
    //       <button type="submit" value="Register">
    //         Register
    //       </button>
    //     </form>
    //   </div>
    // </React.Fragment>
  );
};

export default Register;
