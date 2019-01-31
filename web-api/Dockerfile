FROM node:8

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install nodemon globally
RUN npm install -g nodemon

EXPOSE 5000
CMD [ "nodemon", "--legacy-watch" ]