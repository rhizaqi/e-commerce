import { MongoClient } from "mongodb";
const connectionString = process.env.MONGO_KU as string;

if (!connectionString) {
  throw new Error("Connection string is nedded");
}

let client = new MongoClient(connectionString);

export const getMongoClientInstance = async () => {
  if (client) {
    await client.connect();
  }

  return client;
};
