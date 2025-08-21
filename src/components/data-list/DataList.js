import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomersList() {
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const token = sessionStorage.getItem("token");

        const { data } = await axios.get(
          "https://mcz-api.onrender.com/customers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setDados(data);
      } catch (error) {
        console.error(
          "Erro durante requisição:",
          error.response?.data || error.message
        );
        setErro("Erro ao carregar dados.");
      }
    }

    getData();
  }, []);

  if (erro) {
    return <div>{erro}</div>;
  }

  if (!Array.isArray(dados)) {
    return <div>Formato de dados inesperado.</div>;
  }

  if (dados.length === 0) {
    return <div>Nenhum dado disponível.</div>;
  }

  return (
    <div>
      <h1>Lista de Clientes</h1>
      <div>
        {dados.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h2>{item.name}</h2>
            <p>
              <strong>Descrição:</strong> {item.nomeInfo}
            </p>
            <p>
              <strong>Contato:</strong>{" "}
              {item.contact?.join(", ") || "—"}
            </p>
            <p>
              <strong>Endereço:</strong>{" "}
              {item.address
                ? item.address
                    .map(
                      (addr) =>
                        `${addr.street}, ${addr.neighborhood} - CEP: ${addr.postalCode}`
                    )
                    .join(" | ")
                : "—"}
            </p>

            <p>
              <strong>Horários de Funcionamento:</strong>
            </p>
            <ul>
              {item.openingHours ? (
                Object.entries(item.openingHours).map(([dia, horario]) => (
                  <li key={dia}>
                    <strong>{dia}:</strong> {horario}
                  </li>
                ))
              ) : (
                <li>—</li>
              )}
            </ul>

            <div style={{ display: "flex", gap: "10px" }}>
              {(item.img || []).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  alt="Imagem"
                  style={{ maxWidth: "150px", marginRight: "10px" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
