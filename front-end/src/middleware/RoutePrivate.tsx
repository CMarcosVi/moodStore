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
        // 🔐 1. Verifica se o usuário é admin
        await axios.post("http://localhost:3000/VerifyAdmin", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuthorized(true); // ✅ Token válido e é admin
      } catch (error) {
        console.error("❌ Usuário não autorizado:", error);
        setAuthorized(false); // ❌ Token inválido ou não é admin
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) {
    return <p>🔐 Verificando autenticação...</p>;
  }

  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoutePrivate;
