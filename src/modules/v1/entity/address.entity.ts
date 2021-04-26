import { Geometry } from "geojson"
import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import { User } from "./user.entity"

@Entity('address')
export class AddressEntity extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    addressLine1: string

    @Column()
    addressLine2: string

    @Column()
    doorNo : string

    @Column()
	city : string

    @Column()
	state: string

    @Column()
    country: string

    @Column()
	pincode: number

    @Column()
	tag: string

    @Column()
    latitude: number

    @Column()
    longitude : number

    @OneToOne(() => User, (user) => user.address)
    @JoinColumn()
    user: User
}