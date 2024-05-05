FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Set npm registry to default
RUN npm config set registry https://registry.npmjs.org/

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]