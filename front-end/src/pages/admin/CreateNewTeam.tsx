import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./CreateTeam.css";

const CreateTeam = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nameTeam: "",
    teamArea: "",
    component1: "",
    component2: "",
    component3: "",
    component4: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = Cookies.get("token");

    if (!token) {
      setError("Token não encontrado. Faça login novamente.");
      return;
    }

    // Se estiver vazio, envia null
    const payload = {
      nameTeam: form.nameTeam,
      teamArea: form.teamArea,
      component1: form.component1 || null,
      component2: form.component2 || null,
      component3: form.component3 || null,
      component4: form.component4 || null,
    };

    try {
      await axios.post("http://localhost:3000/admin/teams/CreateTeam", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Time criado com sucesso!");
      setError("");
      setTimeout(() => navigate("/admin/teams"), 1500);
    } catch (err) {
      console.error("Erro ao criar time:", err);
      setError("Erro ao criar time. Verifique os campos.");
      setSuccess("");
    }
  };

  return (
    <section className="create-team-container">
      <h2>Criar Novo Time</h2>

      <form className="create-team-form" onSubmit={handleSubmit}>
        <input name="nameTeam" placeholder="Nome do Time" value={form.nameTeam} onChange={handleChange} required />
        <input name="teamArea" placeholder="Área do Time" value={form.teamArea} onChange={handleChange} required />
        <input name="component1" placeholder="Componente 1 (opcional)" value={form.component1} onChange={handleChange} />
        <input name="component2" placeholder="Componente 2 (opcional)" value={form.component2} onChange={handleChange} />
        <input name="component3" placeholder="Componente 3 (opcional)" value={form.component3} onChange={handleChange} />
        <input name="component4" placeholder="Componente 4 (opcional)" value={form.component4} onChange={handleChange} />
        <button type="submit">Salvar</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default CreateTeam;
