# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Add building tools for native dependencies
RUN apk add --no-cache python3 make g++ build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

COPY package.json package-lock.json* ./

# Install dependencies with optimization
RUN npm ci --no-audit --no-fund

COPY . .

# Build the application
RUN npm run build && ls -la .medusa

# Runner stage
FROM node:20-alpine AS runner
RUN apk add --no-cache curl

WORKDIR /app

# Only copy necessary files from builder
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts
# Copy other necessary files for Medusa V2
COPY --from=builder /app/src ./src

ENV NODE_ENV=production

EXPOSE 9000

CMD ["sh", "-c", "echo 'Vérification de la base de données...' && npx medusa db:migrate --verbose && echo 'Migrations terminées avec succès!' && npm run start"]

