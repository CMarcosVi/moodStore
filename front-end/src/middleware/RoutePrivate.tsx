import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const RoutePrivate = () => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token");

      if (!token) {
        console.warn("🔒 Nenhum token encontrado. Redirecionando...");
        setAuthorized(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/VerifyAdmin", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("✅ Usuário autorizado:", response.data);
        setAuthorized(true);
      } catch (error) {
        console.error("❌ Erro na verificação de admin:");
        setAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) {
    return <p>🔐 Verificando autenticação...</p>; // loading
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // acesso liberado
};

export default RoutePrivate;
