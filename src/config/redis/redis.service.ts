import { RedisModuleOptions } from './redis.interface';
import Redis from 'ioredis';

export function createRedisConnection(options: RedisModuleOptions): Redis {
  const { config } = options;

  if (config?.url) {
    return new Redis(config.url, config);
  }

  return new Redis(config);
}
