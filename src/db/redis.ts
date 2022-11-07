import * as redis from "redis";
import { REDIS_URL } from "../config";

const client = redis.createClient({ url: REDIS_URL });
client.on("error", (err) => console.log("Redis Client Error", err));
(async () => {
  await client.connect();
})();

// export const connectRedis = async () => {
//   client = redis.createClient({ url: REDIS_URL });
//   client.on("error", (err) => console.log("Redis Client Error", err));
//   await client.connect();
// };

export const getRedis = () => {
  if (!client) {
    throw new Error("No Connection Redis");
  }
  return client;
};
