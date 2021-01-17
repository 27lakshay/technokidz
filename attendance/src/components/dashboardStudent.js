import React, { useEffect, useState } from "react";
import backend from "../apis/index";
import "./dashboard.css";
import StudentList from "./list";
import {
  Container,
  ListGroup,
  Button,
  Row,
  ListGroupItem,
} from "react-bootstrap";

const List = () => {
  // const [students, setStudents] = useState([
  //   { _id: null, name: "", isChecked: false },
  // ]);
  const token = localStorage.getItem("x-auth-token");
  const [showResults, setShowResults] = React.useState(false);
  const onButton = () => setShowResults(true);

  useEffect(() => {
    const getUser = async () => {
      if (token) {
        backend.defaults.headers.common["x-auth-token"] = token;
      } else {
        delete backend.defaults.headers.common["x-auth-token"];
      }
      try {
        const response = await backend.get("/api/dashboard/teacher", {
          headers: {
            "auth-token": token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const Results = () => (
    <div id="results" className="search-results">
      <ListGroupItem>Some Results</ListGroupItem>
      <ListGroupItem>Some Results</ListGroupItem>
      <ListGroupItem>Some Results</ListGroupItem>
      <ListGroupItem>Some Results</ListGroupItem>
    </div>
  );

  return (
    <Container>
      <Row>
        <Button
          style={{ marginTop: "5%", marginBottom: "5%" }}
          onClick={onButton}
        >
          Get Result
        </Button>
      </Row>
      <Row>
        <ListGroup>{showResults ? <Results /> : null}</ListGroup>
      </Row>
      {/* <ListGroup>{() => students.map(renderStudentsList)}</ListGroup> */}
    </Container>
  );
};

export default List;
