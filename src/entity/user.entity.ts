import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Role } from './role.entity';

@Entity()
export class User extends BaseEntity {
  @Column({
    default: 0,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  isConfirm?: boolean;

  @Column({
    nullable: true,
  })
  code: string;

  @Column({
    nullable: true,
  })
  roleId: number;

  @OneToOne(() => Role, (role) => role.id)
  role: Role;
}
