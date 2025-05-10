# ---------- Build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Copia dependências (lock + package.json) da pasta frontend
    COPY pnpm-lock.yaml ./
    COPY frontend/package.json ./
    
    # Instala dependências com pnpm
    RUN corepack enable && pnpm install
    
    # Copia arquivos de configuração do projeto
    COPY frontend/index.html ./index.html
    COPY frontend/vite.config.ts ./vite.config.ts
    COPY frontend/postcss.config.js ./postcss.config.js
    COPY frontend/tailwind.config.js ./tailwind.config.js
    COPY frontend/tsconfig.json ./tsconfig.json
    COPY frontend/.env .env
    
    # Copia o código-fonte
    COPY frontend/src ./src
    
    # Compila o projeto (gera dist/)
    RUN pnpm run build
    
    # ---------- Runtime ----------
    FROM nginx:alpine AS production
    WORKDIR /usr/share/nginx/html
    
    # Substitui o default do nginx por um customizado
    COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copia o resultado do build
    COPY --from=build /app/dist ./
    
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]
    