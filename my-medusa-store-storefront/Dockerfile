FROM node:20-alpine

WORKDIR /app

# Enable corepack for yarn (essential for Yarn 4)
RUN corepack enable && corepack prepare yarn@4.12.0 --activate

COPY .yarn ./.yarn
COPY package.json yarn.lock* .yarnrc.yml ./

# Installation des dépendances avec Yarn
RUN yarn install

COPY . .

# Définition des ARGs (Coolify les injectera via les Build Secrets)
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_BASE_URL
ARG NEXT_PUBLIC_DEFAULT_REGION
ARG NEXT_PUBLIC_STRIPE_KEY
ARG NEXT_PUBLIC_STRAPI_URL
ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL

# Exécution du build
RUN yarn build

EXPOSE 8000

CMD ["yarn", "start"]
