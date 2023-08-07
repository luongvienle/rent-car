import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class CarImage extends BaseEntity {
  @Column()
  carId: number;

  @Column()
  url: string;
}
