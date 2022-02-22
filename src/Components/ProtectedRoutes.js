import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

export const ProtectedRouter = ({ children }) => {
  const { user, loading } = useAuth();
  console.log("estamos en el PROTECTED, ", user.currentUser);

  if (loading) {
    return <h1>Loading</h1>;
  }

  // if (user === null) {
  if (!user.currentUser) {
    return <Navigate to="/" />;
  }

  // if (user.currentUser) {
  //   return <Navigate to="/home"></Navigate>;
  // }

  return <>{children}</>;
};
