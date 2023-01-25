import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children, userData }) => {
  const [user, setUser] = useLocalStorage("user", userData);
  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();

  const navigate = useNavigate();

  const login = async () => {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.log(e);
    });
    setUser(accounts[0]);
    navigate("/dashboard/exams", { replace: true });
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
