import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Car {
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

  @PrimaryGeneratedColumn()
  registerCode: number;

  @Column({
    nullable: true,
  })
  rentBy: string;
}
