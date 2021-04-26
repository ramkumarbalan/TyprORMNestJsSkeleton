import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import { getJwtSecrets } from 'src/config/infrastructure.config';
import { User } from '../v1/entity/user.entity';
import { UserRepository } from '../v1/repository/user.repository';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector,@InjectRepository(User) private readonly userModel: UserRepository) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
        throw  new HttpException('Unauthorized', 401);
    }
    const decoded = await this.validateToken(request.headers.authorization);
    const user = JSON.parse(JSON.stringify(decoded));
    const findUser = await this.userModel.findOne({mobileNo: user.mobileNo});
    console.log(findUser)
    if (findUser) {
        if (roles.includes(findUser.role)) {
            const userObj = {
                id: user.id,
                mobileNo: user.mobileNo,
                role: user.role,
            }
            context.switchToHttp().getRequest().user = userObj; // attach the user object in request payload after authentication
            return true;
        }  else { throw new HttpException('Unauthorized', 401); }
    } else { throw new HttpException('Unauthorized', 401); }
  }

  async validateToken(token: string) {
    if (token.split(' ')[0] !== 'Bearer') {
        throw new HttpException('Invalid Token' , HttpStatus.BAD_REQUEST);
    } else {
        const auth = token.split(' ')[1];
        try {
            const decoded = await jwt.verify(auth, getJwtSecrets().secret);
            return decoded;
        } catch (e) {
            const message = 'Token Error ' + ( e.message || e.name );
            throw new HttpException(message, HttpStatus.BAD_REQUEST);
        }
    }
  }
}
