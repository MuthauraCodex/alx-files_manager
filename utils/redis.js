import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this.client = createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);
    this.client.on('error', (err) => {
      console.log(`Redis client not connected: ${err.message}`);
    });
  }

  isAlive() {
    return this.client.connected;
  }

  async get(key) {
    // takes key string and returns redis value stored in the key
    return this.getAsync(key);
  }

  async set(key, value, timeout) {
    // takes key, value and timeout as args to store in redis
    return this.client.setex(key, timeout, value);
  }

  async del(key) {
    // takes key and deletes from redis
    this.client.del(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
