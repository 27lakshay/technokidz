import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import Header from "./Header";
import UserContext from "../context/context";
import backend from "../apis/index";

import Register from "./register";
import history from "../history";
import Login from "./login";
import Students from "./students";
import TeacherDashboard from "./dashboardTeacher";

const App = () => {
  const [userData, setUserData] = useState({
    isLoggedIn: null,
  });
  const token = localStorage.getItem("auth-token");

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
            "x-auth-token": token,
          },
        });
        setUserData({
          isLoggedIn: true,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <Router history={history}>
        <Header />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/dashboard" exact component={TeacherDashboard} />
          {/* <Route path="/student/dashboard" exact component={StudentDashboard} /> */}
          <Route path="/students" exact component={Students} />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
