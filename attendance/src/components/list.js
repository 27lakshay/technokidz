import React, { useEffect, useState } from "react";
import backend from "../apis/index";
import "./dashboard.css";
import { ListGroup } from "react-bootstrap";

const StudentList = () => {
  const [students, setStudents] = useState([
    { _id: null, name: "", isChecked: false },
  ]);
  const [present, setPresent] = useState(false);
  const [attendance, setAttendance] = useState();

  const token = localStorage.getItem("x-auth-token");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await backend.get("/api/attendance/students", {
        headers: {
          "auth-token": token,
        },
      });
      setStudents(response.data);
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data);
    }
  };
  // const isChecked = () => {

  // }

  //   const handleCheckChieldElement = (event) => {
  //     student.forEach(student => {
  //       if (students.value === event.target.value)
  //         fruite.isChecked =  event.target.checked
  //       })
  //     this.setState({fruites: fruites})
  //  }

  // const renderCheckbox = (student) => {
  //   console.log(student);
  //   return (
  //     <label className="switch">
  //       <input
  //         type="checkbox"
  //         // checked={props.isChecked}
  //         // onClick={(e) => student}
  //         // onChange={(e) => props.isChecked(e.target.checked)}
  //       />
  //       <span className="slider round"></span>
  //     </label>
  //   );
  // };
  function renderStudentsList(student) {
    return (
      <div key={student._id}>
        <li>
          {student.name}
          {/* {renderCheckbox(student)} */}
        </li>
      </div>
    );
  }

  // const listItems = students.map((student) => <li>{student}</li>);
  return (
    <>
      <button onClick={submit}>Get the list of students</button>
      <ListGroup>
        <ListGroup.Item>{students.map(renderStudentsList)}</ListGroup.Item>
      </ListGroup>
    </>
    // <React.Fragment>
    //   <div>
    //     <h3>print a list of students</h3>
    //     <button onClick={submit}>Get the list of students</button>
    //     <ol>{students.map(renderStudentsList)}</ol>
    //   </div>
    // </React.Fragment>
  );
};

export default StudentList;
