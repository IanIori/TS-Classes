import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./user.entity"

@Entity()
export default class Address extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    street!: string

    @Column()
    num!: number

    @Column()
    neighbourhood!: string

    @Column()
    city!: string

    @Column()
    state!: string

    @Column()
    zipcode!: number

    @OneToOne (() => User, user => user.address)
    user!: User
}