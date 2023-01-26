/* eslint-disable */
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const ProtectedLayout = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const outlet = useOutlet();
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <AppBar pages={[{ label: "Exams", path: "exams" }]} />
      {outlet}
    </div>
  );
};
/* eslint-enable */
