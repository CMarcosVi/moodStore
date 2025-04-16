import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ProtectedRoute = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null); // null = carregando

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        setAuthorized(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/verifyToken", {
          token,
        });
        console.log(response.status)
        setAuthorized(response.status == 200);
      } catch (error) {
        console.error("Token inválido ou erro na verificação:", error);
        setAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) return <p>Verificando autenticação...</p>;

  return authorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
