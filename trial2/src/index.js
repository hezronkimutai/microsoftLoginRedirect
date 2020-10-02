import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import b2cauth from "react-azure-adb2c";

// https://devource.b2clogin.com/
//devource.onmicrosoft.com/v2.0/.well-known/openid-configuration?p=B2C_1_devource
// b2cauth.initialize({
//   instance: "https://devource.b2clogin.com",
//   tenant: "devource.onmicrosoft.com",
//   signInPolicy: "B2C_1_react-signup",
//   applicationId: "aedb4633-5401-49e5-85a2-647c5311028e",
//   cacheLocation: "sessionStorage",
//   scopes: ["https://devource.onmicrosoft.com/api/user_impersonation"],
//   redirectUri: "http://localhost:3000",
//   postLogoutRedirectUri: window.location.origin,
// });
b2cauth.initialize({
  instance: "https://login.microsoftonline.com/tfp/",
  tenant: "peachitad.onmicrosoft.com",
  signInPolicy: "B2C_1_react_signup",
  applicationId: "702f55a3-72fd-4da1-a22b-1dc82e70a049",
  cacheLocation: "sessionStorage",
  scopes: ["https://peachitad.onmicrosoft.com/api/user_impersonation"],
  redirectUri: "http://localhost:3000",
  postLogoutRedirectUri: window.location.origin,
});

b2cauth.run(() => {
  ReactDOM.render(<App />, document.getElementById("root"));
  serviceWorker.unregister();
});
