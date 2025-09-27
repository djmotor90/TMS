import knex from 'knex';
import { logger } from '../utils/logger';

const knexConfig = require('../../knexfile.js');

class DatabaseService {
  private static instance: knex.Knex;

  static async initialize(): Promise<void> {
    try {
      const environment = process.env.NODE_ENV || 'development';
      this.instance = knex(knexConfig[environment]);
      
      // Test the connection
      await this.instance.raw('SELECT 1+1 as result');
      logger.info('Database connection established successfully');
      
      // Run migrations in development
      if (environment === 'development') {
        await this.instance.migrate.latest();
        logger.info('Database migrations completed');
      }
      
    } catch (error) {
      logger.error('Database connection failed:', error);
      throw error;
    }
  }

  static getInstance(): knex.Knex {
    if (!this.instance) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.instance;
  }

  static async close(): Promise<void> {
    if (this.instance) {
      await this.instance.destroy();
      logger.info('Database connection closed');
    }
  }
}

export { DatabaseService };