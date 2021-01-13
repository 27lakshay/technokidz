import React from "react";
import { Router, Route, Switch } from "react-router-dom";

import Register from "./register";
import history from "../history";
import Login from "./login";
import Students from "./students";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Register} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/students" exact component={Students} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
