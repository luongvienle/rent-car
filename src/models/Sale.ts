import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  saleId: string;

  @Column()
  name: string;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column()
  saleOff: number;

  @Column()
  listCar: any;
}
