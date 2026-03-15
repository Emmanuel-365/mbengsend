# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Ajout des dépendances nécessaires pour les modules natifs (Sharp, etc.)
RUN apk add --no-cache python3 make g++ build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund

COPY . .

ENV NODE_ENV=production

# Un seul build suffit pour tout générer (Server + Admin)
# Medusa place tout dans le dossier .medusa/
RUN npx medusa build
RUN ln -s .medusa/server/public/ public

# Runner stage
FROM node:20-alpine AS runner
# Ajout de vips-dev et libpng si tu utilises Sharp pour les images
RUN apk add --no-cache curl postgresql-client vips-dev libpng-dev

WORKDIR /app

# On copie le dossier .medusa complet généré par le build
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts
# TSConfig et SRC ne sont techniquement plus nécessaires car tout est compilé dans .medusa/server
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

ENV NODE_ENV=production

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]