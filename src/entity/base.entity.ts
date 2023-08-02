import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Column,
} from 'typeorm';

export abstract class BaseEntity {
  @Index()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  createdDate: Date;

  @Column({
    nullable: true,
  })
  updatedDate: Date;
}
