import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AppBar } from "./AppBar";

export const HomeLayout = () => {
  const { isAuthenticated } = useAuth();
  const outlet = useOutlet();

  if (isAuthenticated) {
    return <Navigate to="/dashboard/exams" replace />;
  }

  return (
    <div>
      <AppBar
        pages={[
          { label: "Home", path: "/" },
          { label: "Login", path: "/login" },
        ]}
      />
      {outlet}
    </div>
  );
};
