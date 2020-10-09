import React, { useEffect } from "react";
import { verifyToken } from "../utils";
export default ({ history, setLoggedOut }) => {
  useEffect(() => {
    setLoggedOut(true);
    !verifyToken(localStorage.getItem("token")) && history.push("/dashboard");
  }, []);
  return (
    <div className="text-center p-20 flex flex-col">
      <span className="m-auto my-1">Hey buddy this is the dashboard</span>
      <button
        onClick={() => {
          localStorage.clear();
          setLoggedOut(false);
          history.push("/");
        }}
        type="submit"
        className="m-auto my-1 border-gray-500  w-40 rounded border"
      >
        Logout
      </button>
    </div>
  );
};
