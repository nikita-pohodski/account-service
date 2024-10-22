import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {
  ChangeBalanceParams,
  CheckExistUserParams,
  SearchUserParams,
} from './user.types';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser<T extends DeepPartial<UserEntity>>(
    entity: T,
  ): Promise<UserEntity> {
    return this.userRepository.save(entity);
  }

  async findById(userId: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ userId });
  }

  async findByLogin(login: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOneBy({ login, isDeleted: false });
  }

  async findAndCount(
    params: SearchUserParams,
  ): Promise<{ items: UserEntity[]; total: number }> {
    const [items, total] = await this.queryBuilder(params).getManyAndCount();
    return { items, total };
  }

  async updateUser(params: DeepPartial<UserEntity>): Promise<void> {
    await this.userRepository.update({ userId: params.userId }, params);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userRepository.update({ userId: id }, { isDeleted: true });
  }

  async checkExistUser(
    params: CheckExistUserParams,
    alias = 'user',
  ): Promise<boolean> {
    const query = this.userRepository.createQueryBuilder(alias);

    const result = await query
      .where(`${alias}.login = :login`, { login: params.login })
      .orWhere(`${alias}.phone = :phone`, { phone: params.phone })
      .andWhere(`${alias}.isDeleted = :isDeleted`, { isDeleted: false })
      .getOne();

    return !!result;
  }

  async changeBalance(params: ChangeBalanceParams) {
    const { userId, balance } = params;
    await this.userRepository.update({ userId }, { balance });
  }

  private queryBuilder(
    params: SearchUserParams = {},
    alias = 'user',
  ): SelectQueryBuilder<UserEntity> {
    const query = this.userRepository.createQueryBuilder(alias);

    query.andWhere(`${alias}.isDeleted = :isDeleted`, { isDeleted: false });

    if (params?.userIds?.length) {
      query.andWhere(`${alias}.userId in (:...userIds)`, {
        userIds: params.userIds,
      });
    }

    if (params?.phones?.length) {
      query.andWhere(`${alias}.phone in (:...phones)`, {
        phones: params.phones,
      });
    }

    if (params?.login) {
      query.andWhere(`${alias}.login = :login`, {
        login: params.login,
      });
    }

    //Paginate
    if (params.take) query.take(params.take);
    if (params.skip) query.skip(params.skip);

    return query;
  }
}
