import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, SetMetadata, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/modules/shared/auth.gaurd';
import { CreateUserDto } from '../dto/createuser.dto';
import { UserService } from './user.service';

@Controller('v1/user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get('')
    get() {
        return 'user module is working...'
    }

    @Post('create')
    @UsePipes(ValidationPipe)
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    @SetMetadata('roles', ['customer'])
    updateUser(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.userService.updateUser(id, req)
    }

    @Get('all')
    @UseGuards(AuthGuard)
    @SetMetadata('roles', ['customer'])
    getUser(@Req() req) {
        return this.userService.getUser(req.user);
    }
}
