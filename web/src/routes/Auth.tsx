import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Index = () => {
  const { userLogged } = useAuth();

  return (!userLogged())? <Navigate to="/signIn" />:<Outlet />
};

export default Index;
// import React, { useEffect, useState } from "react";
// import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// interface RoutesPropsData extends RouteProps {
//   role?: string;
// }
// interface Role{
//   id: string;
//   name: string;
// }

// const PrivateRoutes: React.FC<RoutesPropsData> = ({ children ,role, ...rest }) => {
//   const [permissions, setPermissions] = useState(null);
  
//   const { user, userLogged } = useAuth();

//   // useEffect(() => {
//   //   async function loadRoles() {
//   //     const { roles } = user
//   //     const findRole = roles.some((r: Role) =>role?.split(",").includes(r.name));
//   //     console.log(findRole)
//   //     setPermissions(findRole);
//   //   }
//   //   loadRoles();
//   // }, []);

//   if (!userLogged()) {
//     return <Navigate to="/signIn" />;
//   }

//   if (!role && userLogged()) {
//     return <>
//     {children}
//     </>;
//   }

//   console.log(permissions)
  
//   return permissions? <>
//   {children}
//   </>: <Navigate to="/dashboard" />;
// };

// export default PrivateRoutes;
