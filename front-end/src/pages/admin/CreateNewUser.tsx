import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./CreateUser.css";

const CreateUser = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    access: "",
    wage: "",
    position: "",
    password: "",
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

    try {
      const response = await axios.post("http://localhost:3000/admin/createAcount", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Usuário criado com sucesso!");
      setError("");
      setTimeout(() => navigate("/admin/userManeger"), 1500);
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setError("Erro ao criar usuário. Verifique os campos.");
      setSuccess("");
    }
  };

  return (
    <section className="create-user-container">
      <h2>Criar Novo Usuário</h2>

      <form className="create-user-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Nome" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="access" placeholder="Acesso" value={form.access} onChange={handleChange} required />
        <input name="wage" placeholder="Salário" value={form.wage} onChange={handleChange} required type="number" />
        <input name="position" placeholder="Posição" value={form.position} onChange={handleChange} required />
        <input name="password" placeholder="Senha" value={form.password} onChange={handleChange} required type="password" />

        <button type="submit">Salvar</button>
      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </section>
  );
};

export default CreateUser;
