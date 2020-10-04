import * as Msal from "msal";

let PROD_REDIRECT_URI = "http://localhost:4000/";
let redirectUri = window.location.origin;
if (window.location.hostname !== "127.0.0.1") {
  redirectUri = PROD_REDIRECT_URI;
}

const msalConfig = {
  auth: {
    clientId: "261d3e9d-08d5-462f-9982-930d3de1eaae",
    redirectUri: "http://localhost:3000/",
  },
  scopes: ["user.read", "mail.send"],
};

export const app = new Msal.UserAgentApplication(msalConfig);
let username = "";

export const login = () => {
  return app.loginRedirect(msalConfig.scopes);
};
export const logout = () => {
  app.logout();
};
export const getToken = () => {
  return app.acquireTokenSilent(msalConfig).then(
    (accessToken) => {
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", accessToken);
      return accessToken;
    },
    (error) => {
      return app.acquireTokenPopup(msalConfig).then(
        (accessToken) => {
          return accessToken;
        },
        (err) => {
          console.error(err);
        }
      );
    }
  );
};
