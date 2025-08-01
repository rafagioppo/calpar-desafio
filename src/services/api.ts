export async function fetchUsers() {
  const url = "https://09441c3d-9208-4fa9-a576-ba237af6b17c.mock.pstmn.io/";
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erro ao acessar a API");
  }

  const data = await response.json();
  return data;
}
