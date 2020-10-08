import * as Msal from "msal";

const localhosts = ["127.0.0.1", "localhost"];
const redirectUri = localhosts.includes(window.location.hostname)
  ? "http://localhost:3000/"
  : "https://m-login-redirect.herokuapp.com/";

const msalConfig = {
  auth: {
    clientId: "261d3e9d-08d5-462f-9982-930d3de1eaae",
    redirectUri,
  },
  scopes: ["user.read"],
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const app = new Msal.UserAgentApplication(msalConfig);

export const login = async () => {
  return await app.loginRedirect(msalConfig.scopes);
};
export const logout = () => {
  app.logout();
};
export const getToken = async () => {
  try {
    return await app.acquireTokenRedirect(msalConfig);
  } catch (error) {
    return error;
  }
};
// app.handleRedirectCallback(async (error, response) => {
//   if (error) setLoginFailed(error);
//   if (!(response && response.accessToken)) {
//     setUser(response);
//     response &&
//       (await callAPi(
//         {
//           idToken: response.idToken.rawIdToken,
//           data: {},
//           type: "microsoft",
//           uri: "/api/auth/signin",
//         },
//         setToken
//       ));
//   }
// });
