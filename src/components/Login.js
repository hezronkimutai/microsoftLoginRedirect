import React, { useState, useEffect } from "react";
import { login as loginFn, app } from "../services/auth.service";
import microsoftIcon from "../microsoft.png";
import { onChange, onSubmit, callAPi } from "../utils";
import { NavLink } from "react-router-dom";
import inputFields from "../utils/inputFields";

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
    onChange(e, setSigninData);
  };
  const handleSubmit = (e) => {
    onSubmit(e, () => callAPi({ data: signInData, type: "local", uri: "/api/auth/signin" }));
  };
  useEffect(() => {
    app.handleRedirectCallback(async (error, response) => {
      if (error) setLoginFailed(error);
      if (!(response && response.accessToken)) {
        setUser(response);
        response &&
          (await callAPi({
            idToken: response.idToken.rawIdToken,
            data: {},
            type: "microsoft",
            uri: "/api/auth/signin",
          }));
      }
    });
  }, []);
  console.log(token, user);
  const inptFlds = inputFields(handleChange, ["email", "password"]);
  return (
    <div className="text-center p-20">
      <form
        onSubmit={handleSubmit}
        style={{ width: "min-content" }}
        className="flex p-4 m-auto rounded border m-1 flex-col"
      >
        <h1>Login</h1>
        {loginFailed && <span>Login Unsucesful</span>}
        {inptFlds.map((field) => (
          <input
            className="w-64 mx-auto border my-1"
            onChange={field.onChange}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            key={field.name}
          />
        ))}
        <button type="submit" className="m-auto my-1 border-gray-500  w-40  rounded border">
          Signup
        </button>
        OR
        <button className="border-gray-500 flex m-auto w-48 rounded border" onClick={login} type="button">
          <img alt="microsoft icon" className="w-6 h-6 m-1" src={microsoftIcon} />
          <div className="m-auto">Login with Microsoft</div>
        </button>
        <span>
          Don't have an account?
          <NavLink className="text-blue-900 mx-1" to="/signup">
            signup
          </NavLink>
        </span>
      </form>
    </div>
  );
};
