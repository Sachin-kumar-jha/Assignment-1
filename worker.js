import { Worker } from 'bullmq';
import { prisma } from './utils/prisma.js';
const worker = new Worker('requests', async (job) => {
  try {
    console.log(`Processing task for user ${job.data.userId}:`, job.data.task);

    if (!job.data.task || !job.data.task.title || !job.data.userId) {
      throw new Error('Invalid task data or missing userId');
    }
    await prisma.task.create({
      data: {
        title: job.data.task.title,
        user: {
          connect: {id: job.data.userId}
        }
      }
    });

    console.log(`Task completed for user ${job.data.userId}:`, job.id);
    
  } catch (err) {
    console.error(`Failed to process task for user ${job.data.userId}:`, err.message);
  }
}, {
  connection: {
    host: '127.0.0.1',
    port: process.env.REDIS_PORT
  },
  concurrency: 5 
});
