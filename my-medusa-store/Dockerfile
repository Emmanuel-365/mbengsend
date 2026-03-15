# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Add building tools for native dependencies
RUN apk add --no-cache python3 make g++ build-base gcc autoconf automake zlib-dev libpng-dev vips-dev

COPY package.json package-lock.json* ./

# Install dependencies with optimization
RUN npm ci --no-audit --no-fund

COPY . .

# Build the application including admin
ENV NODE_ENV=production
    
# Runner stage
FROM node:20-alpine AS runner
RUN apk add --no-cache curl postgresql-client

WORKDIR /app

# Copy everything from the server build directory
COPY --from=builder /app/.medusa ./.medusa
COPY --from=builder /app/package.json /app/package-lock.json ./
# We need node_modules for the production run
COPY --from=builder /app/node_modules ./node_modules
# tsconfig and medusa-config are needed for runtime resolutions
COPY --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/medusa-config.ts ./medusa-config.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/.medusa/server ./server

ENV NODE_ENV=production

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]

