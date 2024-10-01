# Base image
FROM node:18

# Set working directory
WORKDIR /TW

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the application code
COPY . .

ENV PORT=8000
ENV MONGO_URI="your-mongo-url"
ENV JWT_SECRET=TW


# Expose the port the app runs on
EXPOSE 8000

# Command to run the application
CMD ["npm", "start"]