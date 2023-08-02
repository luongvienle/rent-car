import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  carId: number;

  @Column()
  url: string;
}
