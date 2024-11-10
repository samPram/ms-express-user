# Dockerfile untuk User Service
# Gunakan node image sebagai base
FROM node:20-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy package.json dan package-lock.json terlebih dahulu untuk instalasi dependensi
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh kode sumber aplikasi ke dalam container
COPY . .

# Kompilasi TypeScript jika diperlukan
RUN npm install -g ts-node-dev typescript

ENV PORT=4003
ENV MONGODB_URI=mongodb://sampram:pakpram1141@localhost:27017/db_aldin_betest?authMechanism=DEFAULT&authSource=admin
ENV K_CLIENTID=kafka-service
ENV K_HOST=kafka:9092
ENV K_TOPIC=kafka_aldin_betest

# Build aplikasi TypeScript
RUN npm run build

# Expose port yang digunakan oleh Express
EXPOSE 4003

# Jalankan aplikasi
CMD ["npm", "run", "dev"]

