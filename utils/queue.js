import { Queue } from "bullmq";

export const requestQueue = new Queue('requests', {
  connection: {
    host: '127.0.0.1',
    port:process.env.REDIS_PORT
  }
});

 async function addToQueue(userId, task) {
  await requestQueue.add(`task:${userId}`, { userId, task });
  console.log(`Task added to queue for user: ${userId}`);
}

export default addToQueue;