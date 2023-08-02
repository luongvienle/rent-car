import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Capacity extends BaseEntity {
  @Column()
  capacity: number;

  @Column()
  description: string;
}
