import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity()
export class User {
  @Index()
  @PrimaryGeneratedColumn('increment')
  id: number;

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
  role: string;
}
