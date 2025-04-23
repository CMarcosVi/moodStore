import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [teamsCount, setTeamsCount] = useState(0);
  const navigate = useNavigate();
  
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };

        const [users, teams] = await Promise.all([
          axios.post("http://localhost:3000/admin/ResquerAllUsers", {}, { headers }),
          axios.post("http://localhost:3000/admin/teams/AllTeams",{}, { headers }),
        ]);
        setUsersCount(users.data.value.length|| 0);
        setTeamsCount(teams.data.length || 0);
      } catch (err) {
        console.error("Erro ao buscar dados do dashboard:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <section className="admin-dashboard">
      <h2>Painel Administrativo</h2>

      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h3>Total de Funcionários</h3>
          <p>{usersCount}</p>
        </div>
        <div className="dashboard-card">
          <h3>Total de Times</h3>
          <p>{teamsCount}</p>
        </div>
      </div>

      <div className="dashboard-buttons">
        <button onClick={() => navigate("/AdminManeger/UserManeger")}>Gerenciar Usuários</button>
        <button onClick={() => navigate("/AdminManeger/TeamsNameger")}>Gerenciar Times</button>
      </div>
    </section>
  );
};

export default AdminDashboard;
