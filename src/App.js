import React, { useState, useEffect } from "react";
import "./App.css";
import { login as loginFn, app, logout } from "./services/auth.service";
import microsoftIcon from "./microsoft.png";
import axios from "axios";

const localhosts = ["127.0.0.1", "localhost"];

export const apicallUri = localhosts.includes(window.location.hostname)
  ? "http://localhost:3001/api/auth"
  : "https://ms-login-api.herokuapp.com/api/auth";

const callLoginApi = async (idToken, signInData, type, setToken) => {
  try {
    return await axios({
      method: "post",
      url: apicallUri,
      headers: { Authorization: idToken },
      data: { type, ...signInData },
    });
  } catch (error) {
    return error;
  }
};
const LoggedIn = ({ userName }) => (
  <div>
    <button onClick={logout} type="button">
      Logout
    </button>
    <h3>Hello {userName}</h3>
  </div>
);

const LoggedOut = ({ setToken, login, handleChange, signInData }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    callLoginApi(null, signInData, "local", setToken);
  };
  return (
    <div style={{ padding: "40px" }}>
      <h1>Login</h1>
      <form className="flex m-1 flex-col" onSubmit={handleSubmit}>
        <input name="email" onChange={handleChange} className="m-2 mx-auto w-64" type="text" />
        <input name="password" onChange={handleChange} className="my-2 mx-auto w-64" type="password" />
        <button className="m-auto border-gray-500  w-40  rounded border">login</button>
      </form>
      OR
      <button className="border-gray-500 flex m-auto w-48 rounded border" onClick={login} type="button">
        <img alt="microsoft icon" className="w-6 h-6 m-1" src={microsoftIcon} />
        <div className="m-auto">Login with Microsoft</div>
      </button>
    </div>
  );
};

export default () => {
  const [loginFailed, setLoginFailed] = useState(null);
  const [user, setUser] = useState(null);
  const [signInData, setSigninData] = useState({});
  const [token, setToken] = useState(null);

  const login = async () => {
    setLoginFailed(false);
    await loginFn();
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setSigninData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    app.handleRedirectCallback(async (error, response) => {
      if (error) setLoginFailed(error);
      if (!(response && response.accessToken)) {
        setUser(response);
        response && (await callLoginApi(response.idToken.rawIdToken, {}, "microsoft", setToken));
      }
    });
  }, []);
  let templates = [];
  localStorage.getItem("msal.idtoken") &&
    templates.push(<LoggedIn key="loggedIn" userName={user && user.account.name} />);
  !localStorage.getItem("msal.idtoken") &&
    templates.push(
      <LoggedOut
        setToken={setToken}
        signInData={signInData}
        handleChange={handleChange}
        key="loggedout"
        login={login}
      />
    );
  loginFailed && templates.push(<strong key="loginFailed">Login unsuccessful</strong>);
  console.log(token);

  return <div className="App">{templates}</div>;
};
