import Redis from 'ioredis';

// Create Redis client
const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

// Function to get data from cache
async function getFromCache(key: string): Promise<any> {
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    // Handle error
    console.error('Error while getting data from cache:', error);
    return null;
  }
}

// Function to set data in cache
async function setInCache(key: string, data: any, expiresInSeconds?: number): Promise<void> {
  try {
    const value = JSON.stringify(data);
    if (expiresInSeconds && expiresInSeconds > 0) {
      await redisClient.set(key, value, 'EX', expiresInSeconds);
    } else {
      await redisClient.set(key, value);
    }
  } catch (error) {
    // Handle error
    console.error('Error while setting data in cache:', error);
  }
}

export { getFromCache, setInCache };
