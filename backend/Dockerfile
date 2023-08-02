# Build stage
FROM node:16-alpine as build

# set working directory
WORKDIR /pickme/backend

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy source code
COPY . .

# Run TypeScript build to generate dist/server.js
RUN npm run build

# expose port 4000
EXPOSE 4000

# start app
CMD ["npm", "start"]
