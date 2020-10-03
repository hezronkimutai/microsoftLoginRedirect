import * as Msal from "msal";

let PROD_REDIRECT_URI = "http://localhost:3000/";
let redirectUri = window.location.origin;
if (window.location.hostname !== "127.0.0.1") {
  redirectUri = PROD_REDIRECT_URI;
}
const applicationConfig = {
  clientID: "55fb1d72-47b2-43d4-a119-7feca390c4c8",
  graphScopes: ["user.read"],
};
const app = new Msal.UserAgentApplication(
  applicationConfig.clientID,
  "",
  () => {
    // callback for login redirect
  },
  {
    redirectUri,
  }
);

export const login = () => {
  return app.loginPopup(applicationConfig.graphScopes).then(
    (idToken) => {
      const user = app.getUser();
      console.log(user, "###########################################", idToken);

      if (user) {
        return user;
      } else {
        return null;
      }
    },
    () => {
      return null;
    }
  );
};
export const logout = () => {
  app.logout();
};
export const getToken = () => {
  return app.acquireTokenSilent(applicationConfig.graphScopes).then(
    (accessToken) => {
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", accessToken);

      return accessToken;
    },
    (error) => {
      return app.acquireTokenPopup(applicationConfig.graphScopes).then(
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
