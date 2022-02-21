import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export const ProtectedRouter = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }
  // if (user) {
  //   return <Navigate to="/home"></Navigate>;
  // }

  return <>{children}</>;
};
