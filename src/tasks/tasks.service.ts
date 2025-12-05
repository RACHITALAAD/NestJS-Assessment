import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepo: Repository<Task>,
  ) {}

  async create(dto: CreateTaskDto, owner: User) {
    const t = this.taskRepo.create({ ...dto, owner });
    return this.taskRepo.save(t);
  }

  findAllForUser(userId: number) {
    return this.taskRepo.find({ where: { owner: { id: userId } }, relations: ['owner'] });
  }

  async findOne(id: number) {
    const t = await this.taskRepo.findOne({ where: { id }, relations: ['owner']});
    if (!t) throw new NotFoundException('Task not found');
    return t;
  }

  async update(id: number, dto: UpdateTaskDto) {
    await this.taskRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const t = await this.findOne(id);
    return this.taskRepo.remove(t);
  }
}
