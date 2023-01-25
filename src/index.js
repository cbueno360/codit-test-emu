import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { router } from "./layout/App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
const msalConfig = {
  auth: {
    clientId: "cf8c9a91-e498-41ea-a8af-192339f78805",
    authority:
      "https://login.microsoftonline.com/5f980b41-5556-4826-bff2-56b564879886", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
    redirectUri: "https://codit-exam-test.azurewebsites.net/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

const theme = createTheme({
  palette: {
    primary: { main: "#3a34d2" },
  },
});

root.render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </MsalProvider>
  </StrictMode>
);

// reportWebVitals();
