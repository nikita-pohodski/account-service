import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DatabaseModule } from '../database/database.module';
import { KafkaModule } from '../../config/kafka/kafka.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    DatabaseModule,
    KafkaModule,
  ],
})
export class UserModule {}
