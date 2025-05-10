# ✂️ Mini SaaS para Barbearias — Projeto Simplify

Este é o projeto-base para criação de um **Mini SaaS verticalizado**, começando com o segmento de **barbearias**, mas preparado para escalar para outras áreas como salões de beleza, conveniências, petshops e clínicas.

A aplicação é modular, com separação clara entre autenticação, regras de negócio e frontend, utilizando um monorepo gerenciado por **pnpm workspaces**.

---

## 🎯 Objetivo

Construir um SaaS leve, escalável e de fácil replicação para nichos específicos. O Simplify tem como meta:

- Gerenciar agendamentos
- Controlar clientes e serviços
- Fornecer painel gerencial
- Isolar dados por tenant (barbearia)
- Rodar localmente com mínimo esforço
- Ter deploy completo via Docker

---

## 🧱 Estrutura do projeto

```
simplify/
├── core/
│   └── auth/                # Serviço de autenticação
├── verticals/
│   └── barbershop/          # Lógica de negócio da barbearia
├── frontend/                # Interface web (Vue + Vite + Tailwind)
├── docker-compose.yml       # Stack completa para produção
├── docker-compose.dev.yaml  # Mongo isolado para desenvolvimento local
├── Makefile                 # Comandos automatizados
├── start-local.sh           # Script local: Mongo + serviços
├── pnpm-workspace.yaml      # Definição dos workspaces
└── README.md
```

---

## ⚙️ Tecnologias

- **Node.js** + **Express** + **Mongoose**
- **Vue 3** + **Vite** + **Tailwind CSS**
- **Pinia** + **Vue Router**
- **MongoDB** (isolamento por tenant)
- **JWT** para autenticação segura
- **pnpm** com monorepo
- **Docker** e **Docker Compose**

---

## 🧪 Rodando localmente (sem Docker, exceto Mongo)

### Pré-requisitos

- Node.js 20+
- pnpm (`npm i -g pnpm`)
- Docker apenas para o MongoDB

### Instruções

1. Suba o MongoDB:

```bash
make mongo
```

2. Inicie todos os serviços em modo desenvolvimento:

```bash
make dev
```

---

## 🐳 Rodando com Docker (produção completa)

### Build e execução:

```bash
make up
```

### Parar os serviços:

```bash
make down
```

---

## 🌍 Endpoints padrão

| Serviço             | Endereço                   |
|---------------------|----------------------------|
| Frontend (dev)      | http://localhost:5173      |
| Auth Service        | http://localhost:4000      |
| Agenda (barbershop) | http://localhost:4100      |
| MongoDB             | mongodb://localhost:27017  |

---

## ⚙️ Comandos úteis via Makefile

| Comando            | Ação                                              |
|--------------------|---------------------------------------------------|
| `make mongo`       | Sobe somente o MongoDB (dev local)                |
| `make dev`         | Roda todos os serviços com hot reload via pnpm    |
| `make up`          | Sobe toda a stack via Docker Compose              |
| `make down`        | Para e remove todos os containers                 |
| `make build-frontend` | Recompila somente o frontend                   |
| `make status`      | Mostra o estado dos containers Docker             |
| `make logs s=auth` | Ver logs de um serviço específico                 |

---

## 📌 Variáveis de ambiente

Cada serviço possui um `.env` para produção e `.env.local` para dev:

**Exemplo:**

```env
MONGO_SERVER=localhost
DB_NAME=saas
MONGO_URI=mongodb://localhost:27017/saas
PORT=4000
JWT_SECRET=supersecretdev
```

---

## 📈 Próximos passos

- [ ] Finalizar CRUD de clientes e serviços
- [ ] Tela de agendamento interativa
- [ ] Relatórios por período e barbeiro
- [ ] Exportação para novos segmentos (salão, clínica, petshop)
- [ ] Deploy com CI/CD (Render, Railway, VPS)

---

## 👨‍💻 Autor

Desenvolvido por [@manolli](https://github.com/SEU_USUARIO_AQUI), com o propósito de entregar soluções SaaS acessíveis e específicas para mercados locais e nichados.

---