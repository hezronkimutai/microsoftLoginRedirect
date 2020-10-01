import React from "react";
import MicrosoftLogin from "react-microsoft-login";

export default (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return <MicrosoftLogin clientId={"61b0548f-6fd0-4207-bc4d-f5b47d428324"} authCallback={authHandler} />;
};
