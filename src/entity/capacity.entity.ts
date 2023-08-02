import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Capacity {
  @PrimaryColumn()
  id: number;

  @Column()
  capacity: number;

  @Column()
  description: string;
}
