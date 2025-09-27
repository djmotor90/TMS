import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

class RedisService {
  private static instance: RedisClientType;

  static async initialize(): Promise<void> {
    try {
      this.instance = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });

      this.instance.on('error', (err) => {
        logger.error('Redis Client Error:', err);
      });

      this.instance.on('connect', () => {
        logger.info('Redis Client Connected');
      });

      this.instance.on('ready', () => {
        logger.info('Redis Client Ready');
      });

      await this.instance.connect();
      
    } catch (error) {
      logger.error('Redis connection failed:', error);
      throw error;
    }
  }

  static getInstance(): RedisClientType {
    if (!this.instance) {
      throw new Error('Redis not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  static async close(): Promise<void> {
    if (this.instance) {
      await this.instance.quit();
      logger.info('Redis connection closed');
    }
  }

  // Helper methods for common operations
  static async get(key: string): Promise<string | null> {
    return await this.getInstance().get(key);
  }

  static async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.getInstance().setEx(key, ttl, value);
    } else {
      await this.getInstance().set(key, value);
    }
  }

  static async del(key: string): Promise<void> {
    await this.getInstance().del(key);
  }

  static async exists(key: string): Promise<boolean> {
    const result = await this.getInstance().exists(key);
    return result === 1;
  }
}

export { RedisService };