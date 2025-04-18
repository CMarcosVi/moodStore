import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../middleware/RouteVerify.js"

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const User = lazy(() => import("../pages/User"));
const CreateItem = lazy(() => import("../pages/products/CreateItem"));
const EditItem = lazy(() => import("../pages/products/EditItemInfo"));


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
      </Routes>
    </Suspense>
  );
};

export default RoutesApp;
