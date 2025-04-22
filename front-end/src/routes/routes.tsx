import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middleware/RouteVerify.js"
import RoutePrivate from "../middleware/RoutePrivate.js"


const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const User = lazy(() => import("../pages/User"));
const CreateItem = lazy(() => import("../pages/products/CreateItem"));
const EditItem = lazy(() => import("../pages/products/EditItemInfo"));
const UserManeger = lazy(() => import("../pages/admin/UserManeger"))
const CreateUser = lazy(() => import("../pages/admin/CreateNewUser"))
const TeamManager = lazy(() => import("../pages/admin/TeamsManeger"))
const CreateManager = lazy(() => import("../pages/admin/CreateNewTeam"))
const AdminDashboard = lazy(() => import("../pages/admin/DashBoardAdmin"))

const RoutesApp = () => {
  return (
    <Suspense fallback={<p>Carregando página...</p>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />
          <Route path="/Product/CreateItem" element={<CreateItem />} />
          <Route path="/Product/EditItem/:id_product" element={<EditItem />} />
        </Route>
        <Route element={<RoutePrivate />}>
          <Route path="/adminManeger" element={<AdminDashboard />}/>
          <Route path="/AdminManeger/UserManeger" element={<UserManeger />}/>
          <Route path="/AdminManeger/CreateNewUser" element={<CreateUser />}/>
          <Route path="/AdminManeger/TeamsNameger" element={<TeamManager />}/>
          <Route path="/AdminManeger/CreateNameger" element={<CreateManager />}/>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default RoutesApp;
