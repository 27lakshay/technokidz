import React, { useEffect, useState } from "react";
import backend from "../apis/index";
import "./dashboard.css";
import StudentList from "./list";
import { Container } from "react-bootstrap";

const List = () => {
  // const [students, setStudents] = useState([
  //   { _id: null, name: "", isChecked: false },
  // ]);
  const token = localStorage.getItem("x-auth-token");

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
  return (
    <Container>
      <StudentList />
    </Container>
  );
};

export default List;
