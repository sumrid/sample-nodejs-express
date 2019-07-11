FROM node:8.16.0-alpine
COPY . .

# npm install จะทำการสร้าง node_modules ใน container
RUN npm install
EXPOSE 80
ENTRYPOINT ["npm", "start"]