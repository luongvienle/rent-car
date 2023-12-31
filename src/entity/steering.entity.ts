import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Car } from './car.entity';

@Entity()
export class Steering extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Car, (car) => car.id)
  cars: string[];
}
