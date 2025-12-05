import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({ where: { email: dto.email }});
    if (exists) throw new Error('Email already in use'); 
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);
    const user = this.userRepo.create({ name: dto.name, email: dto.email, password: hash });
    const saved = await this.userRepo.save(user);
   
    const { password, ...rest } = saved as any;
    return rest;
  }

  async validateUser(email: string, plainPassword: string) {
    const user = await this.userRepo.findOne({ where: { email }});
    if (!user) return null;
    const valid = await bcrypt.compare(plainPassword, user.password);
    if (!valid) return null;
    // return user without password
    const { password, ...rest } = user as any;
    return { ...rest };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email }});
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
