import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignInDto {
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
}
