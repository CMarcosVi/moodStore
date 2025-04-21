import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Validação com Yup
const schema = yup.object().shape({
  access: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Senha obrigatória").min(6, "Mínimo 6 caracteres"),
});

interface FormValues {
  access: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await axios.post("http://localhost:3000/loginUser", data);
      const token = response.data.token;

      if (token) {
        Cookies.set("token", token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });

        navigate("/"); // ou "/Home" dependendo da sua rota inicial protegida
      } else {
        setError("Login falhou. Token não retornado.");
      }
    } catch (err) {
      setError("Credenciais inválidas ou erro na requisição.");
      console.error("Erro durante login:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "400px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "1rem" }}>
          <label>Access:</label>
          <input type="text" {...register("access")} />
          {errors.access && <p style={{ color: "red" }}>{errors.access.message}</p>}
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Senha:</label>
          <input type="password" {...register("password")} />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
