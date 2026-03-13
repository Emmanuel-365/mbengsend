FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache python3 make g++

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

# On build explicitement pendant l'étape Docker
RUN npm run build

EXPOSE 9000

# En production, on utilise 'start' au lieu de 'develop'
CMD ["npm", "run", "start"]
