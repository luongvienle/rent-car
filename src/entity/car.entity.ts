import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
  @Index()
  @PrimaryGeneratedColumn()
  registerCode: number;

  @Column()
  name: string;

  @Column()
  available: boolean;

  @Column()
  type: string;

  @Column()
  steeringId: number;

  @Column()
  capacity: number;

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
}
