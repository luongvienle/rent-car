import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class JwtToken {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column()
    token: string
}