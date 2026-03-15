# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 make g++ build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

COPY . .

ENV NODE_ENV=production

# 1. Build du backend
RUN npx medusa build

# 2. Build de l'admin 
RUN npx medusa build --admin-only
    
# Runner stage
FROM node:20-alpine AS runner
RUN apk add --no-cache curl postgresql-client

WORKDIR /app

# On copie tout le dossier .medusa (contient server/ et admin/)
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts
COPY --from=builder /app/src ./src

ENV NODE_ENV=production

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]