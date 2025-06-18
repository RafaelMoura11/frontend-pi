
# Frontend – Análise de Imóveis

Este projeto corresponde à interface frontend do sistema de análise de imóveis. Ele permite que usuários se registrem, façam login e visualizem gráficos baseados em dados imobiliários consumidos de uma API backend. A interface é interativa e responsiva, com filtros para personalizar a análise.

## 🔍 Funcionalidades

- Registro e login de usuários com autenticação via token JWT.
- Tela de login protegida que redireciona para a área de gráficos após autenticação.
- Visualização de gráfico interativo com base nos seguintes filtros:
  - Estado e cidade (dependentes entre si)
  - Faixa de preço
  - Quantidade mínima de quartos e banheiros
- Integração com a API backend hospedada no Render.
- Layout responsivo utilizando Bootstrap.

## 🧰 Tecnologias Utilizadas

- React
- Bootstrap
- Axios
- JavaScript (ES6+)

## 📂 Estrutura de Pastas

```
src/
│
├── App.jsx            # Componente principal que controla autenticação e navegação
├── Login.jsx          # Tela de login com integração à API
├── Register.jsx       # Tela de cadastro de novo usuário
├── Protected.jsx      # Componente com filtros e visualização de gráfico
├── estadosCidades.js  # Mapeamento de estados e cidades usadas nos filtros
├── api.js             # Instância do Axios com token JWT
└── App.css            # Estilização adicional
```

## 🚀 Como Executar Localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/frontend-pi.git
cd frontend-pi
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor com:
```bash
npm start
```

4. Acesse a aplicação:
```
http://localhost:3000/
```

## 🔐 Autenticação

- Ao realizar o login com sucesso, o token JWT é salvo no `localStorage` e incluído nas requisições subsequentes para rotas protegidas.
- O componente `Protected.jsx` só é exibido se o token estiver presente.

## 🌎 Integração com a API

A aplicação se comunica com o backend através da URL:

```
https://backend-pi-59mq.onrender.com/
```

Os endpoints utilizados são:

- `POST /register` – Cadastro de usuários
- `POST /login` – Login e recebimento de token
- `GET /grafico-preco` – Retorna imagem do gráfico baseado nos filtros

## ✅ Validações

- Todos os campos de registro e login são obrigatórios.
- Campos de filtro (como preço, estado, cidade) são opcionais e a aplicação funciona mesmo sem nenhum filtro.

## 📌 Observações

- O layout foi feito com componentes do Bootstrap para garantir responsividade e uma aparência agradável.
- O botão "Gerar gráfico" é desabilitado durante o carregamento para evitar múltiplas requisições.
- A autenticação protege o acesso à funcionalidade principal de análise.

---

Desenvolvido como parte de um projeto integrador com FastAPI e React 🚀
