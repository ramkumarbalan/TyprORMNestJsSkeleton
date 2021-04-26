import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";

@Entity('user')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column({
        "type": "bigint"
    })
    mobileNo: number

    @Column()
    mobileCode: number

    @Column()
    gender: string

    @Column()
    password: string

    @Column()
    role: string

    @OneToOne(() => AddressEntity, (address) => address.user)
    @JoinColumn()
    address: AddressEntity
}