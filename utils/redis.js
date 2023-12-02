import { createClient } from 'redis';
import { promisify } from 'util';

class RedisClient {
  constructor() {
    this._client = createClient();
    this._isConnected = true;
    this._client.on('connect', () => {
    //   console.log(this._client.connected);2222222
      this._isConnected = true;
    });
    this._client.on('error', (error) => {
      console.log('Error connecting to redis', error);
      this._isConnected = false;
    });
  }

  isAlive() {
    return this._isConnected;
  }

  async get(key) {
    const getValueFor = promisify(this._client.get).bind(this._client);
    const value = await getValueFor(key);
    return value;
  }

  async set(key, value, duration) {
    const clientSet = await promisify(this._client.setex).bind(this._client);
    return clientSet(key, duration, value);
  }

  async del(key) {
    const deleteFor = await promisify(this._client.del).bind(this._client);
    return deleteFor(key);
  }
}

const redisClient = new RedisClient();

export default redisClient;
