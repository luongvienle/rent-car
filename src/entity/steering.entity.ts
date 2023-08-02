import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Steering extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;
}
