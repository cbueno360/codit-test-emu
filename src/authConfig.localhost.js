export const msalConfig = {
  auth: {
    clientId: "cf8c9a91-e498-41ea-a8af-192339f78805",
    authority:
      "https://login.microsoftonline.com/5f980b41-5556-4826-bff2-56b564879886", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "http://localhost:3000/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};
