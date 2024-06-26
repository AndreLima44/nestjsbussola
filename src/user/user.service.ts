import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}

    async findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: number): Promise <User> {
        const user = await this.usersRepository.findOne({ where: { id } } as FindOneOptions<User>);
        return user;
      }
    
      async create(user: User): Promise<User> {
        const salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, salt);
        return this.usersRepository.save(user);
      }
    
      async update(id: number, user: User): Promise<void> {
        await this.usersRepository.update(id, user);
      }
    
      async remove(id: number): Promise<void> {
        await this.usersRepository.delete(id);
      }
    
      async findByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ where: { email } });
      }

    }



