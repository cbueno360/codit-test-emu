import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { InteractionRequiredAuthError } from "@azure/msal-browser";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const isAuthenticated = useIsAuthenticated();
  const [accessToken, setAccessToken] = useState(null);

  const { instance, accounts } = useMsal();

  const navigate = useNavigate();

  const login = async () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
    let token = await getToken();
    console.log(token);
    setAccessToken(token);
    setUser(accounts[0]);
    navigate("/dashboard/exams", { replace: true });
  };

  const getToken = async () => {
    if (accounts.length > 0) {
      const request = {
        scopes: ["User.Read"],
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(request)
        .then((response) => {
          setAccessToken(response.accessToken);
        })
        .catch((error) => {
          // acquireTokenSilent can fail for a number of reasons, fallback to interaction
          if (error instanceof InteractionRequiredAuthError) {
            instance.acquireTokenPopup(request).then((response) => {
              setAccessToken(response.accessToken);
            });
          }
        });
    }

    return accessToken;
  };

  const logout = () => {
    setUser(null);
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/", // redirects the top level app after logout
    });
  };

  const value = useMemo(
    () => ({
      isAuthenticated,
      user,
      setUser,
      accessToken,
      getToken,
      login,
      logout,
    }),
    [user, setUser] // eslint-disable-line react-hooks/exhaustive-deps
  ); // eslint-disable-line react-hooks/exhaustive-deps

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
