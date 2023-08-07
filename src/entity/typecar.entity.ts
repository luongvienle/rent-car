import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Car } from './car.entity';

@Entity()
export class TypeCar extends BaseEntity {
  @Column()
  typeName: string;

  @OneToMany(() => Car, (car) => car.id)
  cars: string[];
}
