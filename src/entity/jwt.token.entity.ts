import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class JwtToken {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Index()
  @Column()
  token: string;
}
