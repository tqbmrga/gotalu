FROM node:8

# Who(m) to blame if nothing works
MAINTAINER tqb.mrga@gmail.com

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Install nodemon globally
RUN npm install

EXPOSE 5000
CMD [ "npm", "start" ]