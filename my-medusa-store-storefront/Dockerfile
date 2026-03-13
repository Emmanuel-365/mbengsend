FROM node:20-alpine

WORKDIR /app

# Enable corepack for yarn
RUN npm install -g corepack && corepack enable

COPY package.json yarn.lock* ./

# Installation des dépendances
RUN yarn install

COPY . .

# Variables d'environnement nécessaires au build de Next.js
# Ces valeurs seront remplacées par Coolify si elles sont marquées comme "Build Variable"
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_MEDUSA_PAYMENTS_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_PAYMENTS_ACCOUNT_ID
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL

# Exécution du build explicitement
RUN yarn build

EXPOSE 8000

# En production, on utilise 'start'
CMD ["yarn", "start"]
