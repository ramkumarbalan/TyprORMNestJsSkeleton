import { Req, Controller, Post, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/modules/shared/auth.gaurd';
import { AddressService } from './address.service';

@Controller('v1/address')
export class AddressController {
    constructor(private readonly addressService: AddressService) {

    }

    @Post('')
    @UseGuards(AuthGuard)
    @SetMetadata('roles', ['customer'])
    async addAddress(@Req() req) {
        return await this.addressService.addAddress(req.body, req.user)
    }
}
