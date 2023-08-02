import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class TypeCar extends BaseEntity {
  @Column()
  typeName: string;
}
