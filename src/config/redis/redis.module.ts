import { Module } from '@nestjs/common';
import { redisOptionsModuleFactory } from './redis.config';
import { REDIS_MODULE_OPTIONS, REDIS_TOKEN } from './redis.constant';
import { createRedisConnection } from './redis.service';

const config = redisOptionsModuleFactory();
const { url } = config.config;

@Module({
  providers: [
    {
      provide: REDIS_MODULE_OPTIONS,
      useValue: {
        url: url,
      },
    },
    {
      inject: [REDIS_MODULE_OPTIONS],
      provide: REDIS_TOKEN,
      useFactory: async () => {
        return createRedisConnection(config);
      },
    },
  ],
  exports: [REDIS_TOKEN],
})
export class RedisModule {}
