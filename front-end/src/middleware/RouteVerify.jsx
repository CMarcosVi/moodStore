import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const RouteVerify = () => {
  const token = Cookies.get("token");

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default RouteVerify;
