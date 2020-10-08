import React, { useEffect } from "react";

const NotFound = ({ history }) => {
  useEffect(() => {
    !localStorage.getItem("token") && history.push("/");
  }, []);
  return <div> NotFound</div>;
};
export default NotFound;
