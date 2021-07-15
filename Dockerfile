FROM node:12.18.1

WORKDIR /app

COPY src/ /app/
COPY package*.json /app/

RUN npm install

COPY . . 

EXPOSE 3001

CMD [ "npm", "start" ]