import { useState, useEffect } from "react";
import { GeoInfo } from "./components/GeoInfo/GeoInfo";

interface Usuario {
  Nome: string;
  Disponivel: boolean;
}

export default function App() {
  const [name, setName] = useState("");
  const [user, setUser] = useState<Usuario | null>(null);
  const [status, setStatus] = useState<"success" | "warning" | "error" | "">(
    ""
  );
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const ultimoNome = localStorage.getItem("ultimoNomePesquisado");
    if (ultimoNome) {
      setName(ultimoNome);
    }
  }, []);

  const handleSearchResult = (
    user: Usuario | null,
    status: "success" | "warning" | "error" | ""
  ) => {
    setUser(user);
    setStatus(status);
    setLoading(false);

    if (user) {
      localStorage.setItem("ultimoNomePesquisado", user.Nome);
    }
  };

  // Função para disparar a busca e controlar loading
  const onSearch = async (searchName: string) => {
    if (!searchName.trim()) return;

    setLoading(true);
    setUser(null);
    setStatus("");

    try {
      const res = await fetch(
        `https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/?nome=${searchName.trim()}`
      );
      const data = await res.json();

      if (!Array.isArray(data?.Dados)) {
        handleSearchResult(null, "error");
        return;
      }

      const encontrado = data.Dados.find(
        (u: Usuario) => u.Nome.toLowerCase() === searchName.trim().toLowerCase()
      );

      if (!encontrado) {
        handleSearchResult(null, "error");
        return;
      }

      handleSearchResult(
        encontrado,
        encontrado.Disponivel ? "success" : "warning"
      );
    } catch {
      handleSearchResult(null, "error");
    }
  };

  return (
    <div className={`${dark ? "dark" : ""}`}>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-6 flex flex-col items-center">
        <div className="w-full max-w-md flex justify-end mb-6">
          <button
            onClick={() => setDark(!dark)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded shadow">
            {dark ? "☀️ Claro" : "🌙 Escuro"}
          </button>
        </div>

        <section className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow mb-12">
          <h1 className="text-2xl font-bold mb-6 text-center">
            🔍 Consulta de Usuário
          </h1>

          <div>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Digite o nome..."
                value={name}
                onChange={(e) => {
                  // Permite apenas letras, espaços e acentuação simples
                  const regex = /^[A-Za-zÀ-ú\s]*$/;
                  if (regex.test(e.target.value)) {
                    setName(e.target.value);
                  }
                }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
                disabled={loading}
              />
              <button
                onClick={() => onSearch(name)}
                className={`px-4 py-2 text-white rounded-lg shadow ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={!name.trim() || loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    Buscando...
                  </span>
                ) : (
                  "Buscar"
                )}
              </button>
            </div>

            {loading ? (
              <div className="animate-pulse space-y-2 mt-4">
                <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
              </div>
            ) : (
              status && (
                <div
                  className={`w-full p-4 rounded-lg mb-4 text-center text-sm font-medium
                ${
                  status === "success"
                    ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                    : status === "warning"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                    : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                }
              `}>
                  {status === "success" && "✅ Sucesso ao encontrar usuário!"}
                  {status === "warning" &&
                    "⚠️ Sucesso ao encontrar usuário, mas está indisponível."}
                  {status === "error" && "❌ Usuário não encontrado."}
                </div>
              )
            )}

            {!loading && user && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow p-6 text-gray-800 dark:text-white">
                <p className="text-lg font-semibold mb-2">
                  Usuário: {user.Nome}
                </p>
                <p>
                  Disponível:{" "}
                  {user.Disponivel ? (
                    <span className="text-green-600 font-bold">✅ Sim</span>
                  ) : (
                    <span className=" text-red-600 "> ❌ Não</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </section>

        <GeoInfo />
      </main>
    </div>
  );
}
