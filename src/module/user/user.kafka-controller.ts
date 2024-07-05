import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EventNameEnum, EventTransactionSavedData } from './user.types';

@Controller()
export class UserKafkaController {
  constructor(private readonly userService: UserService) {}

  @EventPattern(EventNameEnum.TransactionSaved)
  async handleBalanceChanged(
    @Payload() message: EventTransactionSavedData,
  ): Promise<void> {
    await this.userService.changeBalance(message);
  }
}
