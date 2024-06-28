import { RedisOptions } from 'ioredis';

export interface RedisModuleOptions {
  config: RedisOptions & { url?: string };
}
