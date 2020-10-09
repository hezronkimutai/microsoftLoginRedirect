import * as Msal from "msal";

const { REACT_APP_MS_AZURE_CLIENT_ID, REACT_APP_PROD_REDIRECT_URI, REACT_APP_LOCAL_REDIRECT_URI } = process.env;
const localhosts = ["127.0.0.1", "localhost"];
const redirectUri = localhosts.includes(window.location.hostname)
  ? REACT_APP_LOCAL_REDIRECT_URI
  : REACT_APP_PROD_REDIRECT_URI;

const msalConfig = {
  auth: {
    clientId: REACT_APP_MS_AZURE_CLIENT_ID,
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
