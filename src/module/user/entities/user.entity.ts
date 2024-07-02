import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
@Index(['login', 'phone'])
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: 'User ID',
    name: 'user_id',
  })
  readonly userId: string;

  @Column('varchar', {
    comment: 'User phone number',
    nullable: false,
    length: 20,
  })
  phone: string;

  @Index()
  @Column('varchar', {
    comment: 'User login',
    nullable: false,
    length: 20,
  })
  login: string;

  @Column('varchar', { comment: 'First name' })
  firstName: string;

  @Column('varchar', { comment: 'Last name' })
  lastName: string;

  @Column('varchar', { comment: 'Middle name' })
  middleName: string;

  @Column('varchar', { comment: 'Password hash' })
  passwordHash: string;

  @Column('varchar', { comment: 'Password salt' })
  passwordSalt: string;

  @Column('varchar', { comment: 'Balance', nullable: false, default: '0' })
  balance: string;

  @Column('varchar', {
    comment: 'Account was deleted',
    nullable: true,
    default: false,
  })
  isDeleted: boolean;
}
