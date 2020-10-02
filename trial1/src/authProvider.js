// authProvider.js
import { MsalAuthProvider, LoginType } from "react-aad-msal";

// Msal Configurations
const config = {
  auth: {
    authority: "https://login.microsoftonline.com/common",
    clientId: "aedb4633-5401-49e5-85a2-647c5311028e",
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

// Authentication Parameters
const authenticationParameters = {
  scopes: [
    // "<property (i.e. user.read)>",
    // "https://<your-tenant-name>.onmicrosoft.com/<your-application-name>/<scope (i.e. demo.read)>",
    "https://peachitad.onmicrosoft.com/api/user_impersonation",
  ],
};

// Options
const options = {
  loginType: LoginType.Popup,
  tokenRefreshUri: window.location.origin + "/auth.html",
};

export const authProvider = new MsalAuthProvider(config, authenticationParameters, options);
