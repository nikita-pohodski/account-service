import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance } from 'class-transformer';
import { IsString } from 'class-validator';
import { UserEntity } from '../entities/user.entity';

export class UserDto {
  @ApiProperty({
    description: 'User ID',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'User login',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  login: string;

  @ApiProperty({
    description: 'User password',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  password: string;

  @ApiProperty({
    description: 'User phone',
    required: true,
    type: String,
  })
  @Expose()
  phone: string;

  @ApiProperty({
    description: 'User name',
    required: true,
    type: String,
  })
  @Expose()
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    required: true,
    type: String,
  })
  @Expose()
  lastName: string;

  @ApiProperty({
    description: 'User middle name',
    required: true,
    type: String,
  })
  @Expose()
  middleName: string;

  @ApiProperty({
    description: 'User email',
    required: true,
    type: String,
  })
  @Expose()
  email: string;

  @ApiProperty({
    description: 'User balance',
    type: String,
  })
  @Expose()
  balance: string;

  constructor(entity: Partial<UserEntity>) {
    return plainToInstance(UserDto, entity, { excludeExtraneousValues: true });
  }
}
