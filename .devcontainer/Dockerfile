FROM node:20

WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]
