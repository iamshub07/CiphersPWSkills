# Define the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code into the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Start the application server
CMD ["npm", "start"]
