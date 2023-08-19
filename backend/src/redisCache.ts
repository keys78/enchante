import Redis from 'ioredis';

const redisClient = new Redis({
  host: 'redis',
  // host: 'localhost',
  port: 6379,
});

(async () => {
  try {
    console.log('Redis client connected:', redisClient.status);

    // console.log('Fetching from cache for key:', 'allProducts');
    // const cachedData = await getFromCache('allProducts');
    // console.log('Cached data:', cachedData);

  } catch (error) {
    console.error('Error:', error);
  }
})();

// Function to get data from cache
async function getFromCache(key: string): Promise<any> {
  try {
    const cachedData = await redisClient.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
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
    console.error('Error while setting data in cache:', error);
  }
}

export { getFromCache, setInCache };
