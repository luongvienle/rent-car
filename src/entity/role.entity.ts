import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;

  @Column()
  role: string;
}
