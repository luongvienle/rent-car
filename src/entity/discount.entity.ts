import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Car } from './car.entity';

@Entity()
export class DiscountInfo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  dateStart: Date;

  @Column()
  dateEnd: Date;

  @Column()
  saleOffPercent: number;

  @OneToMany(() => Car, (car) => car.id)
  cars: string[];
}
