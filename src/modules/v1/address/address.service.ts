import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from '../repository/address.repository';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class AddressService {
    constructor(
        @InjectRepository(AddressRepository) private addressRepository: AddressRepository,
        @InjectRepository(UserRepository) private userRepository: UserRepository
        ) {}

    async addAddress(body,user) {
        try {
            const userData = await this.userRepository.findOne({id: user.id});
            if(userData) {
                body.user = userData;
            }
            const address = await this.addressRepository.save(body);
            if(address) {
                await this.userRepository.save(userData)
             return address;
            } else {
                throw new HttpException('Failed to create address', HttpStatus.BAD_REQUEST);    
            }
        } catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        } 
    }
}
