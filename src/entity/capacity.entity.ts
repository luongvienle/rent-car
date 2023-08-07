import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Car } from './car.entity';

@Entity()
export class Capacity extends BaseEntity {
  @Column()
  capacity: number;

  @Column()
  description: string;

  @OneToMany(() => Car, (car) => car.id)
  cars: string[];
}
