import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/createuser.dto';
import { UserRepository } from '../repository/user.repository';
import * as jwt from 'jsonwebtoken';
import { getJwtSecrets } from 'src/config/infrastructure.config';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository) {}


    async createUser(createUserDto: CreateUserDto) {
        const user = await this.userRepository.save(createUserDto)
        const token = this.sign(user);
        return {user, token}
    }

    async updateUser(id, req) {
        if (req.user.id === id) {
            return await this.userRepository.save({
                id: id,
                name: req.body.name
            });
        } else {
             throw new HttpException('Unauthorized', 401);
        }
    }

    sign(user) {
        const { id, mobileNo, role } = user;
        return jwt.sign(
        {
            id,
            mobileNo,
            role,
        },
        getJwtSecrets().secret,
        );
    }

    async getUser(user) {
        return await this.userRepository.createQueryBuilder('user')
        .leftJoinAndSelect('user.address', 'address')
        // .select(['user','address.addressLine1', 'address.addressLine2'])  equalent to populate
        .getMany()
    }
}
