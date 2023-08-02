import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class JwtToken extends BaseEntity {
  @Index()
  @Column()
  token: string;
}
