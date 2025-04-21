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
        console.warn("🔒 Nenhum token encontrado. Redirecionando...");
        setAuthorized(false);
        return;
      }

      try {
        await axios.post("http://localhost:3000/verifyToken", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAuthorized(true); // ✅ Token válido
      } catch (error) {
        console.error("❌ Erro na verificação do token:", error);
        setAuthorized(false); // ❌ Token inválido ou erro
      }
    };

    checkAuth();
  }, []);

  if (authorized === null) {
    return <p>🔐 Verificando autenticação...</p>;
  }

  // ❌ Token ausente ou inválido: redireciona
  if (authorized === false) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Token válido: permite acesso
  return <Outlet />;
};

export default ProtectedRoute;
