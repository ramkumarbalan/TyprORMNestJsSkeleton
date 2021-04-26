import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressRepository } from '../repository/address.repository';
import { UserRepository } from '../repository/user.repository';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([AddressRepository, UserRepository])],
  controllers: [AddressController],
  providers: [AddressService]
})
export class AddressModule {}
