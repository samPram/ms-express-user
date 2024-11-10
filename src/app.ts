import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { consumer, producer } from "./config/kafka.config";
import userRoutes from "./routes/user.route";
import { insertNewUser } from "./controllers/user.consumer";

dotenv.config();
const app = express();

app.use(express.json());

// kafka
producer.connect();

// Connect db
const start = async () => {
  try {
    console.log("starting db...");
    await mongoose.connect(process.env.MONGODB_URI as string);

    mongoose.syncIndexes();
    console.log("connected to db.");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

// Register routes
app.use("/api/v1/users", userRoutes);

// kafka
consumer.connect();
insertNewUser().catch(console.error);

export default app;
