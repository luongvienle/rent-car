import { IsInt } from 'class-validator';
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

export class PaginationDto {
  @IsInt()
  page: number;

  @IsInt()
  offset: number;
}

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
  price: number;

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

  @Column({
    nullable: true,
  })
  locked: boolean; //
}
