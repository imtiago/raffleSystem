import { Navigate, Route, Routes } from "react-router-dom";
// import Dashboard from "../pages/Dashboard";
// import List from "../pages/List";
// import Login from "../pages/Login";
import Home from "../pages/LandingPage/Home";
// import Product from "../pages/Product";

// import { Navigate, useRoutes } from 'react-router-dom';
// // layouts
import Dashboard from '../pages/Dashboard';
import DashboardLayout from '../layouts/dashboard';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// //
// import Blog from '../pages/Blog';
import User from '../pages/User';
import Order from '../pages/Order';
import ValidateUser from '../pages/ValidateUser';
import Raffle from '../pages/Raffle/index3';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Teste from '../pages/Teste';
import NotFound from '../pages/Page404';
import Product from '../pages/Product';
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
import PrivateRoutes from "./PrivateRoutes";
import Auth from "./Auth";
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import { systemRoles } from "../utils/checkRole";
import navConfig from "../layouts/dashboard/NavConfig";
// import DashboardApp from '../pages/DashboardApp';


const AppRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/teste" element={<Teste />} /> */}
      {/* <Route path="/index" element={<Home />} /> */}
      <Route path='/signUp' element={<SignUp />} />,
      <Route path="/signIn" element={<SignIn />} />
      <Route path='/users/:id/token/:validateId' element={<ValidateUser />} />,

      {/* <Route
        path= "/teste"
        element={<LogoOnlyLayout />} 
        /> */}

      <Route element={<Auth />}>
        <Route path="/" element={<DashboardLayout />} >
          <Route path='/' element={<Navigate to="/dashboard" />} />,
          <Route
            path='/dashboard'
            element={<Dashboard />}
          />

          <Route path='/orders' element={<Order />} />,


          {/* <Route element={<PrivateRoutes roles={[systemRoles.ROLE_ADMIN, systemRoles.ROLE_USER]} />}>, */}
          <Route element={<PrivateRoutes roles={[]} />}>,
            <Route path='/user' element={<User />} />,
            <Route path='/profile' element={<Profile />} />,
            <Route path='/raffle' element={<Raffle />} />,
            <Route path='/settings' element={<Settings />} />,
          </Route>,




          {/* <Route element={<PrivateRoutes roles={[systemRoles.ROLE_ADMIN]} />}>, */}
          <Route element={<PrivateRoutes roles={[]} />}>,
            <Route path='/product' element={<Product />} />,
          </Route>,
          <Route path='/404' element={<NotFound />} />,
          <Route
            path='*'
            element={<Navigate to="/404" replace />}
          />,
        </Route>
      </Route>
    </Routes >
  );
};

export default AppRoutes;
