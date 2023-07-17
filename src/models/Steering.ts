import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Steering {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
