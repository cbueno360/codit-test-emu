import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { RouterProvider } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { router } from "./layout/App";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
console.log(msalConfig);
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
