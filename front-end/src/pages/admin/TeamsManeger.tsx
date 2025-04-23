  import { useEffect, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  import Cookies from "js-cookie";

  interface TeamData {
    id: number;
    nameTeam: string;
    teamArea: string;
    component1?: string | null;
    component2?: string | null;
    component3?: string | null;
    component4?: string | null;
  }

  const TeamManager = () => {
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
    const [showEditModal, setShowEditModal] = useState<TeamData | null>(null);
    const [editForm, setEditForm] = useState<Partial<TeamData>>({});
    const navigate = useNavigate();

    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };

    useEffect(() => {
      const fetchTeams = async () => {
        try {
          const response = await axios.post("http://localhost:3000/admin/teams/AllTeams", {}, { headers });
          setTeams(response.data);
        } catch (err) {
          setError("Erro ao buscar times.");
          console.error("❌ Erro ao buscar times:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchTeams();
    }, []);

    const handleDelete = async (id: number) => {
      try {
        await axios.delete("http://localhost:3000/admin/teams/DeleteTeam", {
          headers,
          data: { id },
        });

        setTeams((prev) => prev.filter((team) => team.id !== id));
        setShowDeleteModal(null);
      } catch (err) {
        console.error("❌ Erro ao deletar time:", err);
      }
    };

    const handleEditSubmit = async () => {
      if (!showEditModal) return;

      const updatedData = {
        id: showEditModal.id,
        nameTeam: editForm.nameTeam || showEditModal.nameTeam,
        teamArea: editForm.teamArea || showEditModal.teamArea,
        component1: editForm.component1 ?? showEditModal.component1 ?? null,
        component2: editForm.component2 ?? showEditModal.component2 ?? null,
        component3: editForm.component3 ?? showEditModal.component3 ?? null,
        component4: editForm.component4 ?? showEditModal.component4 ?? null,
      };

      try {
        await axios.put("http://localhost:3000/admin/teams/EditTeam", updatedData, { headers });

        setTeams((prev) =>
          prev.map((team) =>
            team.id === showEditModal.id ? { ...team, ...updatedData } : team
          )
        );

        setShowEditModal(null);
        setEditForm({});
      } catch (err) {
        console.error("❌ Erro ao editar time:", err);
      }
    };

    if (loading) return <p>🔄 Carregando times...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
      <section className="team-manager">
        <h2>Gerenciamento de Times</h2>

        <button className="create-team-btn" onClick={() => navigate("/AdminManeger/CreateNewUser")}>
          ➕ Criar novo time
        </button>

        <table className="team-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Time</th>
              <th>Área</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team.id}>
                <td>{team.id}</td>
                <td>{team.nameTeam}</td>
                <td>{team.teamArea}</td>
                <td>
                  <button onClick={() => setShowDeleteModal(team.id)}>🗑️</button>
                  <button onClick={() => setShowEditModal(team)}>✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal de exclusão */}
        {showDeleteModal !== null && (
          <div className="modal">
            <p>Deseja realmente excluir este time?</p>
            <div className="modal-buttons">
              <button onClick={() => handleDelete(showDeleteModal)}>Sim</button>
              <button onClick={() => setShowDeleteModal(null)}>Não</button>
            </div>
          </div>
        )}

        {/* Modal de edição */}
        {showEditModal && (
          <div className="modal">
            <h3>Editar Time</h3>

            <input
              placeholder="Nome do Time"
              defaultValue={showEditModal.nameTeam}
              onChange={(e) => setEditForm({ ...editForm, nameTeam: e.target.value })}
            />

            <input
              placeholder="Área do Time"
              defaultValue={showEditModal.teamArea}
              onChange={(e) => setEditForm({ ...editForm, teamArea: e.target.value })}
            />

            <input
              placeholder="Componente 1"
              defaultValue={showEditModal.component1 ?? ""}
              onChange={(e) => setEditForm({ ...editForm, component1: e.target.value || null })}
            />

            <input
              placeholder="Componente 2"
              defaultValue={showEditModal.component2 ?? ""}
              onChange={(e) => setEditForm({ ...editForm, component2: e.target.value || null })}
            />

            <input
              placeholder="Componente 3"
              defaultValue={showEditModal.component3 ?? ""}
              onChange={(e) => setEditForm({ ...editForm, component3: e.target.value || null })}
            />

            <input
              placeholder="Componente 4"
              defaultValue={showEditModal.component4 ?? ""}
              onChange={(e) => setEditForm({ ...editForm, component4: e.target.value || null })}
            />

            <div className="modal-buttons">
              <button onClick={handleEditSubmit}>Salvar</button>
              <button onClick={() => setShowEditModal(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </section>
    );
  };

  export default TeamManager;
