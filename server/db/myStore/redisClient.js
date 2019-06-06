import redis from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

const redisClient = redis.createClient(REDIS_URL);

redisClient.on('connect', () => {
  console.log('redis connected');
});

redisClient.on('error', (error) => {
  console.error('Error connecting to redis', error);
});

export default redisClient;
