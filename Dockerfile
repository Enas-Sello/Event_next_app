# Use a base image with Node.js pre-installed
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run your application
CMD ["node", "app.js"]
