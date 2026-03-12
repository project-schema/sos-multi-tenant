FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g pm2
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3099

CMD ["pm2-runtime", "npm", "--", "start"]