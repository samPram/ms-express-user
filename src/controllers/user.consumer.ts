import { getUserByIdNumber, createUser } from "../services/user.service";
import { consumer } from "../config/kafka.config";
import dotenv from "dotenv";

dotenv.config();

const insertNewUser = async () => {
  await consumer.subscribe({
    topic: `${process.env.K_TOPIC}`,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }: any) => {
      console.log(topic, message.value.toString());
      const event = JSON.parse(message.value.toString());

      if (event.event === "create") {
        const { userName, emailAddress, identityNumber } = event.data;
        const exist_data = await getUserByIdNumber(identityNumber);

        if (exist_data) {
          return;
        } else {
          await createUser({
            userName,
            emailAddress,
            identityNumber,
          });
        }
      }
    },
  });
};

export { insertNewUser };
