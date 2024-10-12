# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package.json yarn.lock tsconfig.json vite.config.ts ./

# Install app dependencies
RUN yarn install

# Copy source code
COPY src ./src

# Build the app using Vite
RUN yarn build

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "dist/app.js"]
