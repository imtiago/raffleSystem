import React, { useEffect, useState } from "react";
import { Navigate, Outlet, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { checkRole, Role } from "../utils/checkRole";

interface RoutesPropsData extends RouteProps {
  roles?: Role[],
}

const PrivateRoutes = ({ roles }: RoutesPropsData) => {
  // const [permissions, setPermissions] = useState(null);
  const { user, userLogged } = useAuth();
  // const [permission, setPermission] = useState(
  //   function loadRoles() {
  //       const { user: u } = useAuth();
  //       const { roles } = u
  //       const findRole = roles.some((r: Role) =>role?.split(",").includes(r.name));
  //       return findRole
  //       // console.log(findRole)
  //       // setPermission(findRole);
  //     }
  // );
    // const checkPermission = ():boolean => {
    //     // const { user: u } = useAuth();
    //     console.log("roles")
    //     const { roles } = user
    //     console.log(roles)
    //     const findRole = roles.some((r: Role) =>role?.split(",").includes(r.name));
    //     return findRole
    //     // console.log(findRole)
    //     // setPermission(findRole);
    //   }
  
  // const permission = ()=> user?.roles.some((r: Role) =>role?.split(",").includes(r.name));
  const permission = roles? checkRole(roles,user.roles): false;

  // useEffect(() => {
  //   async function loadRoles() {
  //     const { roles } = user
  //     const findRole = roles.some((r: Role) =>role?.split(",").includes(r.name));
  //     console.log(findRole)
  //     setPermission(findRole);
  //   }
  //   loadRoles();
  // }, []);

  // if (!userLogged()) 
  //   return <Navigate to="/signIn" />

  if (!roles || roles.length === 0) 
    return <Outlet />

  // console.log(permission)
  
  return permission? <Outlet /> : <Navigate to="/dashboard" />
};

export default PrivateRoutes;
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
