# ---------- Fase 1: Build ----------
    FROM node:20-alpine AS build
    WORKDIR /app
    
    # Dependências de sistema para compilar bcrypt (g++, make, python3)
    RUN apk add --no-cache make g++ py3-pip
    
    # Copia tudo (cuidado com .dockerignore)
    COPY . .
    
    # Ativa o pnpm + instala TUDO (prod + dev) e compila TS
    RUN corepack enable \
     && pnpm install --unsafe-perm  \
     && pnpm run build
    
    # ---------- Fase 2: Runtime ----------
    FROM node:20-alpine
    WORKDIR /app
    ENV NODE_ENV=production
    
    # Copia apenas o que é necessário da fase anterior
    COPY --from=build /app/dist ./dist
    COPY --from=build /app/package.json ./package.json
    COPY --from=build /app/pnpm-lock.yaml ./pnpm-lock.yaml
    
    # Instala somente *production* deps
    RUN corepack enable \
     && pnpm install --prod  --unsafe-perm
    
    EXPOSE 4000
    CMD ["node", "dist/server.js"]
    