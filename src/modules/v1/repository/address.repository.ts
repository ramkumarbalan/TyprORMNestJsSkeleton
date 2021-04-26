
import { EntityRepository, Repository } from "typeorm";
import { AddressEntity } from "../entity/address.entity";

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {}