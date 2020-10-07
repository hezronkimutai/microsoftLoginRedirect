import React from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
