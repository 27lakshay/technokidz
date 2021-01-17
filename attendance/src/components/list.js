// import React, { useEffect, useState } from "react";
// import backend from "../apis/index";
// import "./dashboard.css";
// import { Container, ListGroup, Button } from "react-bootstrap";

// const StudentList = () => {
//   const [students, setStudents] = useState([
//     { _id: null, name: "", isChecked: false },
//   ]);
//   const [present, setPresent] = useState(false);
//   const [attendance, setAttendance] = useState();
//   const [showResults, setShowResults] = React.useState(false);
//   const onButton = () => setShowResults(true);

//   const token = localStorage.getItem("x-auth-token");

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await backend.get("/api/attendance/students", {
//         headers: {
//           "auth-token": token,
//         },
//       });
//       setStudents(response.data);
//     } catch (err) {
//       console.log(err);
//       // window.alert(err.response.data);
//     }
//   };
//   // const isChecked = () => {

//   // }

//   //   const handleCheckChieldElement = (event) => {
//   //     student.forEach(student => {
//   //       if (students.value === event.target.value)
//   //         fruite.isChecked =  event.target.checked
//   //       })
//   //     this.setState({fruites: fruites})
//   //  }

//   const renderCheckbox = (student) => {
//     return (
//       <label className="switch">
//         <input
//           type="checkbox"
//           checked={present}
//           // onClick={(e) => student}
//           onChange={(e) => setPresent(e.target.checked)}
//         />
//         <span className="slider round"></span>
//       </label>
//     );
//   };
//   function renderStudentsList(student) {
//     return (
//       <React.Fragment key={student._id}>
//         <ListGroup.Item>
//           {student.name}
//           {renderCheckbox(student)}
//         </ListGroup.Item>
//       </React.Fragment>
//     );
//   }
//   const Results = () => (
//     <div id="results" className="search-results">
//       Some Results
//     </div>
//   );

//   // const listItems = students.map((student) => <li>{student}</li>);
//   return (
//     <Container>
//       <Button
//         style={{ marginTop: "5%", marginBottom: "5%" }}
//         onClick={onButton}
//       >
//         Get the list of students
//       </Button>
//       <ListGroup>{showResults ? <Results /> : null}</ListGroup>
//       {/* <ListGroup>{() => students.map(renderStudentsList)}</ListGroup> */}
//     </Container>
//   );
// };

// export default StudentList;
