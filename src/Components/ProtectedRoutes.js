import { Navigate } from "react-router-dom";
//Context
import { useAuth } from "./Context/AuthContext";
import { useRol, RolProvider } from "./Context/RolContex";

function hasPermission(userRole, routeRole) {
  if (userRole === "admin") return true;
  return userRole === routeRole;
}

export const RoleComponent = ({ children, role }) => {
  return (
    <ProtectedRouter>
      <RolProvider>
        <RoleProtectedRouter role={role}>{children}</RoleProtectedRouter>
      </RolProvider>
    </ProtectedRouter>
  );
};

export const RoleProtectedRouter = ({ children, role }) => {
  const userRole = useRol();
  if (!hasPermission(userRole, role)) {
    if (userRole === "chef") {
      return <Navigate to="/chef" />;
    } else {
      return <Navigate to="/waiter" />;
    }
  }
  return <>{children}</>;
};

export const ProtectedRouter = ({ children }) => {
  const { user } = useAuth();

  if (!user.currentUser) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
