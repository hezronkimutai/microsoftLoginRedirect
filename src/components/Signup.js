import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import inputFields from "../utils/inputFields";
import { onChange, onSubmit, callAPi, verifyToken } from "../utils";

export default ({ history, setLoggedOut }) => {
  const [signupData, setSignupData] = useState({});
  const [token, setToken] = useState(null);
  const handleChange = (e) => {
    onChange(e, setSignupData);
  };
  const inptFlds = inputFields(handleChange, ["name", "email", "password"]);
  const handleSubmit = (e) => {
    onSubmit(e, () => callAPi({ data: signupData, type: "local", uri: "/api/auth/signup" }, setToken));
  };
  useEffect(() => {
    setLoggedOut(true);
    verifyToken(localStorage.getItem("token")) && history.push("/dashboard");
  }, [token]);
  return (
    <div className="text-center py-20 px-0">
      <form
        onSubmit={handleSubmit}
        style={{ width: "min-content" }}
        className="flex p-4 m-auto shadow rounded border m-1 flex-col"
      >
        <h1>Signup</h1>
        {inptFlds.map((field) => (
          <input
            className="w-64 mx-auto border my-1"
            onChange={field.onChange}
            name={field.name}
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
          />
        ))}
        <button type="submit" className="m-auto my-1 border-gray-500  w-40  rounded border">
          Signup
        </button>
        <span className="my-1">
          Already have an account?
          <NavLink className="text-blue-900 mx-1" to="/">
            Signin
          </NavLink>
        </span>
      </form>
    </div>
  );
};
