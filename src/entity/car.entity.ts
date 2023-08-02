import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Car extends BaseEntity {
  @Column()
  name: string;

  @Column()
  available: boolean;

  @Column()
  typeId: number;

  @Column()
  steeringId: number;

  @Column()
  capacityId: number;

  @Column()
  rentPrice: number;

  @Column()
  gasoline: number;

  @Column()
  description: string | null;

  @Index()
  @Column({
    nullable: true,
  })
  rentBy: string;

  @Column('simple-array')
  images: string[];
}