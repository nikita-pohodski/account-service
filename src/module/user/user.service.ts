import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserDto } from './dto/user.dto';
import { SignInDto } from './dto/sign-in.dto';
import { REDIS_TOKEN } from '../../config/redis/redis.constant';
import { Redis } from 'ioredis';

@Injectable()
export class UserService {
  constructor(
    @Inject(REDIS_TOKEN) private readonly redis: Redis,
    private readonly userRepository: UserRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.checkExistUser({
      phone: createUserDto.phone,
      login: createUserDto.login,
    });

    if (userExist) {
      throw new ConflictException('User already exist');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);

    await this.userRepository.createUser({
      passwordHash: hash,
      passwordSalt: salt,
      ...createUserDto,
    });
  }

  async findAll(getUserFilterDto: GetUsersFilterDto): Promise<{
    items: UserDto[];
    total: number;
  }> {
    const { total, items: users } = await this.userRepository.findAndCount(
      getUserFilterDto,
    );

    const dtos = users.map((user) => new UserDto(user));
    return { items: dtos, total };
  }

  async findOne(id: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findById(id);
    return new UserDto(userEntity);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    return this.userRepository.updateUser({ userId: id, ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    await this.redis.del(user.login);

    return this.userRepository.deleteUser(id);
  }

  async verification({ login, password }: SignInDto): Promise<boolean> {
    const user = await this.userRepository.findByLogin(login);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return bcrypt.compare(password, user.passwordHash);
  }
}