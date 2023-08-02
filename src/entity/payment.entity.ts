import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Payment extends BaseEntity {
  @Column()
  paymentName: string;
}
