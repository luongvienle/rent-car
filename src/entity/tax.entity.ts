import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Tax extends BaseEntity {
  @Column()
  percent: string;
}
