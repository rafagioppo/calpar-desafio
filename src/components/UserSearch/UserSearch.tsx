import { useState } from "react";

interface Usuario {
  Nome: string;
  Disponivel: boolean;
}

interface UserSearchProps {
  onSearchResult: (
    user: Usuario | null,
    status: "success" | "warning" | "error" | ""
  ) => void;
  initialName: string;
  onNameChange: (name: string) => void;
}

export function UserSearch({
  onSearchResult,
  initialName,
  onNameChange,
}: UserSearchProps) {
  const [name, setName] = useState(initialName);

  const handleSearch = async () => {
    const nomePesquisado = name.trim();
    if (!nomePesquisado) return;

    onSearchResult(null, ""); // limpar estado anterior

    try {
      const res = await fetch(
        `https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/?nome=${nomePesquisado}`
      );
      const data = await res.json();

      if (!Array.isArray(data?.Dados)) {
        onSearchResult(null, "error");
        return;
      }

      const encontrado = data.Dados.find(
        (u: Usuario) => u.Nome.toLowerCase() === nomePesquisado.toLowerCase()
      );

      if (!encontrado) {
        onSearchResult(null, "error");
        return;
      }

      onSearchResult(encontrado, encontrado.Disponivel ? "success" : "warning");
    } catch {
      onSearchResult(null, "error");
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Digite o nome..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            onNameChange(e.target.value);
          }}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:border-gray-700"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow">
          Buscar
        </button>
      </div>
    </div>
  );
}
