# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Ajout des dépendances nécessaires pour les modules natifs (Sharp, etc.)
RUN apk add --no-cache python3 make g++ build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

COPY package.json package-lock.json* ./
RUN npm ci --no-audit --no-fund --include=dev

COPY . .

# Variables d'environnement nécessaires pour le build
ENV NODE_ENV=production
ENV MEDUSA_BACKEND_URL=http://localhost:9000

# Un seul build suffit pour tout générer (Server + Admin)
# Medusa place tout dans le dossier .medusa/
RUN npx medusa build

# Vérifier que l'admin a bien été généré
RUN ls -la .medusa/server/public/admin/index.html || (echo "ERREUR: Admin non généré!" && exit 1)


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
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh
# TSConfig et SRC ne sont techniquement plus nécessaires car tout est compilé dans .medusa/server
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/src ./src

# Créer le lien symbolique public -> .medusa/server/public dans le runner
RUN ln -sf /app/.medusa/server/public /app/public

ENV NODE_ENV=production

RUN chmod +x ./entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]