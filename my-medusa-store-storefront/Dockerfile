FROM node:20-alpine

WORKDIR /app

COPY package.json yarn.lock* ./

# Next.js 15 might need higher memory
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm install -g corepack && corepack enable && yarn install

COPY . .

EXPOSE 8000

CMD ["yarn", "dev"]
