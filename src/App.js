import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { login as loginFn, app, logout, getToken } from "./services/auth.service";
import { getUserInfo } from "./services/graph.service";

export default () => {
  const [userInfo, setUserInfo] = useState(null);
  const [apiCallFailed, setApiCallFailed] = useState(null);
  const [loginFailed, setLoginFailed] = useState(null);
  const [user, setUser] = useState(null);

  const callAPI = () => {
    setApiCallFailed(false);
    getToken().then(
      (token) => {
        getUserInfo(token).then(
          (data) => {
            setUserInfo(data);
          },
          (error) => {
            console.error(error);
            setApiCallFailed(true);
          }
        );
      },
      (error) => {
        console.error(error);
        setApiCallFailed(true);
      }
    );
  };

  const login = () => {
    setLoginFailed(false);
    loginFn();
    getToken();
  };
  useEffect(() => {
    app.handleRedirectCallback((error, response) => {
      // handle redirect response or error
      console.log("DDDDDDDDDDDDDDDDDD", response);
      setUser(response);
    });
  }, []);
  let templates = [];
  user && templates.push(<LoggedIn callAPI={callAPI} userName={user.name} />);
  !user && templates.push(<LoggedOut login={login} />);
  userInfo && templates.push(<pre key="userInfo">{JSON.stringify(userInfo, null, 4)}</pre>);
  loginFailed && templates.push(<strong key="loginFailed">Login unsuccessful</strong>);
  apiCallFailed && templates.push(<strong key="apiCallFailed">Graph API call unsuccessful</strong>);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">React app with MSAL.js</h1>
      </header>
      {templates}
    </div>
  );
};

const LoggedIn = ({ userName, callAPI }) => (
  <div key="loggedIn">
    <button onClick={callAPI} type="button">
      Call Graph's /me API
    </button>
    <button onClick={logout} type="button">
      Logout
    </button>
    <h3>Hello {userName}</h3>
  </div>
);

const LoggedOut = ({ login }) => (
  <div key="loggedout">
    <button onClick={login} type="button">
      Login with Microsoft
    </button>
  </div>
);
