import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @ApiProperty({
    description: '',
    type: [String],
    required: true,
    example: [
      '068f8913-34d8-4b0f-b3f0-c732e855bcde',
      '51868538-077d-4f30-adda-fec6e18e4b30',
    ],
  })
  @IsOptional()
  @IsString({
    each: true,
    message: ' Fields in "clientIds" array should be an strings',
  })
  readonly userIds?: string[];

  @ApiProperty({
    description: '',
    type: [String],
    required: true,
    example: ['79001110102', '375333518629'],
  })
  @IsOptional()
  @IsString({
    each: true,
    message: ' Fields in "phones" array should be an strings',
  })
  readonly phones?: string[];

  @ApiProperty({
    description: '',
    type: String,
    example: 'login',
  })
  @IsOptional()
  @IsString()
  readonly login?: string;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}
