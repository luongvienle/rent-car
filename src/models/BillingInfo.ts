import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BillingInfo {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

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
  saleId: number | null;

  @Column()
  pickUpDate: Date;

  @Column()
  dropOffDate: Date;
}
