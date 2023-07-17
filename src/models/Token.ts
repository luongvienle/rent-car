import { Column, Entity } from 'typeorm';

@Entity()
export class Token {
  @Column()
  token: string;
}
