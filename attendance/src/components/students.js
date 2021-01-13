import React, { useEffect, useState, useContext } from "react";
import backend from "../apis/index";
import UserContext from "../context/UserContext";

const List = () => {
  const [attendance, setAttendance] = useState("");
  const [list, setList] = useState([]);

  const token = localStorage.getItem("auth-token");
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const getUser = async () => {
      // var data = JSON.stringify({ id: userId });
      // console.log(data);
      if (token) {
        backend.defaults.headers.common["auth-token"] = token;
      } else {
        delete backend.defaults.headers.common["auth-token"];
      }
      try {
        const response = await backend.post("/api/user/", {
          headers: {
            "auth-token": token,
          },
          userId,
        });
        localStorage.setItem("role", response.data.role);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  // return response.data.map((data) => {});

  const submit = async (e) => {
    e.preventDefault();
    console.log(role);
    try {
      const response = await backend.post("/api/attendance/students", {
        headers: {
          "auth-token": token,
        },
        role,
      });
      setList(response.data.map((data) => [data.name]));
    } catch (err) {
      console.log(err);
      // window.alert(err.response.data);
    }
  };

  const listItems = list.map((list) => <li>{list}</li>);
  return (
    <React.Fragment>
      <div>
        <h3>print a list of students</h3>
        <button onClick={submit}>Get the list of students</button>
        <ul>{listItems}</ul>
      </div>
    </React.Fragment>
  );
};

export default List;
