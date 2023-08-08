import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class BillingInfo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  carId: number;

  @Index()
  @Column()
  email: string;

  @Column()
  paymentId: number;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  pickUpLocation: string;

  @Column()
  dropOffLocation: string;

  @Column()
  subTotal: number;

  @Column()
  tax: number;

  @Column()
  discountId: number | null;

  @Column()
  pickUpDate: Date;

  @Column()
  dropOffDate: Date;
}
