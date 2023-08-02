FROM node:14-alpine as builder

WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5555
CMD ["npm","start"]
