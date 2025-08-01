# Desafio Calpar - Consulta de Usuários

## Funcionalidades Implementadas

- Consulta de nome de usuário via API.
- Retorno visual sobre o status:
  - Sucesso: usuário encontrado e disponível.
  - Sucesso: usuário encontrado, mas indisponível.
  - Erro: usuário não encontrado.
- Botão de busca desativado até o campo ser preenchido corretamente.
- Validação para aceitar apenas letras no campo de busca.
- Feedback visual durante a busca (loading).
- Dark mode ativável manualmente.
- Funcionalidade bônus: exibição da localização atual.
- Mensagem de erro orientando o usuário a permitir o acesso à localização, caso negado.

## Estrutura do Projeto

- `src/App.tsx`: componente principal que organiza os componentes e estilos.
- `src/components/UserSearch/UserSearch.tsx`: componente de busca de usuários.
- `src/components/GeoInfo/GeoInfo.tsx`: componente responsável pela geolocalização.
- `tailwind.config.js`: configurações do Tailwind CSS.
- `vite.config.ts`: configuração do bundler Vite.
- `index.css`: estilos globais baseados no Tailwind CSS.

## Decisões de design

- **TailwindCSS**: Escolhido pela agilidade na estilização e pela leveza no controle de estilos condicionais (dark mode, responsividade...).
- **Vite**: Utilizado como bundler pela performance e rapidez no desenvolvimento local.
- **API nativa de geolocalização**: Para aproveitar uma funcionalidade real do navegador.
- **Componentização**: Separação entre lógica de busca e localização para manter o `App.tsx` mais limpo e modular.
- **Feedback claro para o usuário**: Buscando melhorar a UX com mensagens visuais e diferenciação clara entre os resultados.

## Como Rodar o Projeto Localmente

`1 - Clone o repositorio`: git clone https://github.com/rafagioppo/calpar-desafio.git

`2 - Acesse a pasta do projeto`: cd calpar-desafio

`3 - Instale as dependecias`: npm install

`4 - Execute o projeto`: npm run dev

`5 - Acesse o navegador`: http://localhost:5173

:)
