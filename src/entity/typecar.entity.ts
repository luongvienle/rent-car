import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TypeCar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  typeName: string;
}
