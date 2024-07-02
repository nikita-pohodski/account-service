import { TransactionType } from '../user.types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';

export class ChangeBalanceDto {
  @ApiProperty({
    description: 'User ID',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  userId: string;

  @ApiProperty({
    description: 'Amount',
    required: true,
    type: String,
  })
  @Expose()
  @IsString()
  amount: string;

  @ApiProperty({
    description: 'Transaction type',
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @Expose()
  transactionType?: TransactionType;
}
