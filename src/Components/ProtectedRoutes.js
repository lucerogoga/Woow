import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import { useRol, RolProvider } from "./Context/RolContex";

function hasPermission(userRole, routeRole) {
  debugger;
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
  console.log(userRole);
  if (!hasPermission(userRole, role)) {
    if (userRole === "chef") {
      debugger;
      return <Navigate to="/chef" />;
    } else {
      return <Navigate to="/waiter" />;
    }
  }
  return <>{children}</>;
};

export const ProtectedRouter = ({ children }) => {
  const { user } = useAuth();
  // const userRole = useRol();
  // console.log("estamos en el PROTECTED, ", user.currentUser, userRole);
  // console.log("estamos en el PROTECTED, ", user.currentUser.uid);

  // if (user === null) {
  if (!user.currentUser) {
    console.log("que ta pasando");
    return <Navigate to="/" />;
  }

  // if (!hasPermission(userRole, role)) {
  //   if (userRole === "chef") {
  //     return <Navigate to="/chef" />;
  //   } else {
  //     return <Navigate to="/waiter" />;
  //   }
  // }

  // if (user.currentUser && user.user_rol === 'waiter') {
  //   return <Navigate to="/waiter"></Navigate>;
  // }

  return <>{children}</>;
};
