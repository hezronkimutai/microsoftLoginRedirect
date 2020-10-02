import React from "react";
import MicrosoftLogin from "react-microsoft-login";

export default (props) => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };

  return <MicrosoftLogin clientId={"aedb4633-5401-49e5-85a2-647c5311028e"} authCallback={authHandler} />;
};
