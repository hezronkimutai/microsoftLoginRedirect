import React, { useState } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/dashboard";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [loggedOut, setLoggedOut] = useState(true);
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Login {...props} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup {...props} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => <Dashboard {...props} loggedOut={loggedOut} setLoggedOut={setLoggedOut} />}
        />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
