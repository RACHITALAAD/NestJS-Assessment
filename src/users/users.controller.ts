import { Controller , Get , Post , Put , Delete , Body , Param , UseGuards , Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService : UsersService){}

    @Post()
    create(@Body() body : CreateUserDto){
        return this.usersService.create(body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Request() req) {
        return { id: req.user.userId, email: req.user.email };
    }

    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    findOne(@Param('id') id : string){
        return this.usersService.findOne(+id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    update(@Param('id') id : string , @Body() body : UpdateUserDto){
        return this.usersService.update(+id , body);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id : string){
        return this.usersService.remove(+id);
    }
}

