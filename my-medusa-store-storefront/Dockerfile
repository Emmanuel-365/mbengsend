FROM node:20-alpine

WORKDIR /app

# On utilise npm car un fichier package-lock.json est présent
# et c'est plus stable dans cet environnement Docker
COPY package.json package-lock.json* ./

# Désactivation de la télémétrie Next.js pour accélérer le build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm install

COPY . .

# Variables d'environnement pour le build de Next.js
# Celles-ci DOIVENT être marquées comme "Build Variable" dans Coolify
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL

# Exécution du build
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start"]
