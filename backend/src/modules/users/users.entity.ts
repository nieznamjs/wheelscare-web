import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@entities';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column({ select: false, nullable: true })
  public password: string;

  @Column({ default: false })
  public active: boolean;
}
