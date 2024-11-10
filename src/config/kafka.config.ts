import { Kafka } from "kafkajs";
import dotenv from "dotenv";

dotenv.config();

const kafka = new Kafka({
  clientId: process.env.K_CLIENTID as string,
  brokers: [`kafka:9092`], // Ganti dengan alamat broker Kafka Anda
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "user" });

export { producer, consumer };
