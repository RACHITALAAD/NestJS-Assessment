import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository }  from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo : Repository<User>,
    ){}

    create(data: CreateUserDto){
        const user = this.userRepo.create(data);
        return this.userRepo.save(user);
    }

    findAll(){
        return this.userRepo.find();
    }

    async findOne(id : number){
        const user = await this.userRepo.findOne({where : {id}});
        if(!user){
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async update(id : number , data : UpdateUserDto){
        const user = await this.findOne(id);
        Object.assign(user , data);
        return this.userRepo.save(user);
    }

    async remove(id : number){
        const user = await this.findOne(id);
        return this.userRepo.remove(user);
    }
}
