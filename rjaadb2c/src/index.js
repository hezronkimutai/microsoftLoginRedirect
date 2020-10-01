import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import b2cauth from "react-azure-adb2c";

b2cauth.initialize({
  instance: "https://login.microsoftonline.com/tfp/",
  tenant: "TENANT",
  signInPolicy: "SIGNIN POLOCY",
  applicationId: "APP ID",
  cacheLocation: "sessionStorage",
  scopes: ["SCOPES"],
  redirectUri: "http://localhost:3000",
  postLogoutRedirectUri: window.location.origin,
});

b2cauth.run(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
  serviceWorker.unregister();
});
