
FROM node:20


WORKDIR /Assignment

COPY package*.json ./
RUN npm install

RUN npm install -g prisma

COPY . .

RUN npx prisma generate
# Expose the port the app runs on
EXPOSE 3000

# Set environment variables
ENV REDIS_PORT=6379
ENV DATABASE_URL=postgresql://user:password@db:5432/mydatabase

# Run database migrations
CMD ["npx", "prisma", "migrate", "deploy"] && node index.js
