import React, { useEffect, useState } from "react";
import backend from "../apis/index";
import "./dashboard.css";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
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
      <ListGroupItem>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Col>
            <label>Some Result</label>
          </Col>
          <Col>
            {" "}
            <label className="switch ml-auto">
              <input
                type="checkbox"
                // checked={present}
                // onChange={(e) => setPresent(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Col>
            <label>Some Result</label>
          </Col>
          <Col>
            {" "}
            <label className="switch ml-auto">
              <input
                type="checkbox"
                // checked={present}
                // onChange={(e) => setPresent(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </Col>
        </Row>
      </ListGroupItem>
      <ListGroupItem>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Col>
            <label>Some Result</label>
          </Col>
          <Col>
            {" "}
            <label className="switch ml-auto">
              <input
                type="checkbox"
                // checked={present}
                // onChange={(e) => setPresent(e.target.checked)}
              />
              <span className="slider round"></span>
            </label>
          </Col>
        </Row>
      </ListGroupItem>
    </div>
  );

  return (
    <Container>
      <Button
        style={{ marginTop: "5%", marginBottom: "5%" }}
        onClick={onButton}
      >
        Get the list of students
      </Button>
      <ListGroup>{showResults ? <Results /> : null}</ListGroup>
      {/* <ListGroup>{() => students.map(renderStudentsList)}</ListGroup> */}
    </Container>
  );
};

export default List;
