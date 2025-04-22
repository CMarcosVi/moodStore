import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "./UserManeger.css"; // ← importa o CSS externo
import { useNavigate } from "react-router-dom";


interface UserData {
  id_collaborator: number;
  name: string;
  email: string;
  access: string;
  wage: number;
  position: string;
}

const UserManeger = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState<number | null>(null);
  const [showEditModal, setShowEditModal] = useState<UserData | null>(null);
  const [editForm, setEditForm] = useState<Partial<UserData>>({});

  const token = Cookies.get("token");

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/admin/ResquerAllUsers", {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
        setError("Erro ao buscar usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {    
    try {
      await axios.delete(`http://localhost:3000/admin/DeleteUser`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id_collaborator: id },
      });

      setUsers((prev) => prev.filter((user) => user.id_collaborator !== id));
      setShowDeleteModal(null);
    } catch (err) {
      console.error("Erro ao deletar usuário:", err);
      alert("Erro ao deletar usuário.");
    }
  };

  const handleEditSubmit = async () => {
    if (!showEditModal) return;

    const updatedData = {
      id_collaborator: showEditModal.id_collaborator,
      name: editForm.name || showEditModal.name,
      email: editForm.email || showEditModal.email,
      access: editForm.access || showEditModal.access,
      wage: editForm.wage || showEditModal.wage,
      position: editForm.position || showEditModal.position,
    };

    try {
      await axios.put("http://localhost:3000/admin/EditUser", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers((prev) =>
        prev.map((u) =>
          u.id_collaborator === showEditModal.id_collaborator ? { ...u, ...updatedData } : u
        )
      );

      setShowEditModal(null);
      setEditForm({});
    } catch (err) {
      console.error("Erro ao editar usuário:", err);
      alert("Erro ao editar usuário.");
    }
  };

  if (loading) return <p>🔄 Carregando usuários...</p>;
  if (error) return <p className="error">{error}</p>;
  const navigate = useNavigate();
  return (
    <section className="user-manager">
      <h2>Gerenciamento de Usuários</h2>
      <button className="create-user-btn" onClick={() => navigate("/AdminManeger/CreateNewUser")}>
        ➕ Criar novo usuário
      </button>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th><th>Nome</th><th>Email</th><th>Acesso</th><th>Salário</th><th>Posição</th><th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id_collaborator}>
              <td>{user.id_collaborator}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.access}</td>
              <td>{user.wage}</td>
              <td>{user.position}</td>
              <td>
                <button onClick={() => setShowDeleteModal(user.id_collaborator)}>🗑️</button>
                <button onClick={() => setShowEditModal(user)}>✏️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de exclusão */}
      {showDeleteModal !== null && (
        <div className="modal">
          <p>Tem certeza que deseja excluir este usuário?</p>
          <div className="modal-buttons">
            <button onClick={() => handleDelete(showDeleteModal)}>Sim</button>
            <button onClick={() => setShowDeleteModal(null)}>Não</button>
          </div>
        </div>
      )}

      {/* Modal de edição */}
      {showEditModal && (
        <div className="modal">
          <h3>Editar Usuário</h3>
          <input placeholder="Nome" defaultValue={showEditModal.name}
            onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
          <input placeholder="Email" defaultValue={showEditModal.email}
            onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
          <input placeholder="Acesso" defaultValue={showEditModal.access}
            onChange={(e) => setEditForm({ ...editForm, access: e.target.value })} />
          <input placeholder="Salário" type="number" defaultValue={showEditModal.wage}
            onChange={(e) => setEditForm({ ...editForm, wage: parseFloat(e.target.value) })} />
          <input placeholder="Posição" defaultValue={showEditModal.position}
            onChange={(e) => setEditForm({ ...editForm, position: e.target.value })} />
          <div className="modal-buttons">
            <button onClick={handleEditSubmit}>Salvar</button>
            <button onClick={() => setShowEditModal(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default UserManeger;
