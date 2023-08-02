import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class SaleInfo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column()
  saleOffPercent: number;
}
