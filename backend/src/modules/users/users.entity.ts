import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@entities';
import { UserRoles } from '@purbanski-deftcode/wc-common';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column({ select: false, nullable: true })
  public password: string;

  @Column({ default: false })
  public active: boolean;

  @Column({ default: UserRoles.Member })
  public role: UserRoles;

  @Column({ select: false, unique: true, nullable: true, type: 'bigint' })
  public facebookId: number;

  @Column({ select: false, unique: true, nullable: true })
  public googleId: string;
}
