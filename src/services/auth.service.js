import * as Msal from "msal";
// https://microsoft-login-redirect.herokuapp.com/
const msalConfig = {
  auth: {
    clientId: "261d3e9d-08d5-462f-9982-930d3de1eaae",
    redirectUri:
      window.location.hostname === "127.0.0.1" ? "http://localhost:3000/" : "https://m-login-redirect.herokuapp.com/",
  },
  scopes: ["user.read", "mail.send"],
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const app = new Msal.UserAgentApplication(msalConfig);

export const login = () => {
  return app.loginRedirect(msalConfig.scopes);
};
export const logout = () => {
  app.logout();
};
export const getToken = () => {
  return app.acquireTokenSilent(msalConfig).then(
    (accessToken) => {
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
