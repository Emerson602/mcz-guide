import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const url = "https://mcz-api.onrender.com/login";

    try {
      const response = await axios.post(url, { username, password });
      const token = response.data.token;

      sessionStorage.setItem("token", token);

      navigate("/list");

    } catch (error) {
      console.error(error);
      alert("Login falhou. Verifique suas credenciais.");
    }
  }

  return (
    
      <div className={styles.container}>
        
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">
              Usuário:
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password">
              Senha:
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required              
            />
          </div>

          <button
            type="submit"            
          >
            Entrar
          </button>
        </form>
      </div>
    
  );
}
