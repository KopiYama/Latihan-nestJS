// src/user/user.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['posts'], // jika ingin sekaligus memuat relasi Post
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'], // muat relasi Post juga (opsional)
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    await this.userRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findByEmail(email: string, limit?: number): Promise<User[]> {
    const query = this.userRepository.createQueryBuilder('user')
      .where('user.email LIKE :email', { email: `%${email}%` })
      .orderBy('user.id', 'DESC');

    if (limit) {
      query.limit(limit);
    }

    return query.getMany();
  }

  async getUserWithPosts(id: number, limit?: number): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['posts'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (limit && user.posts) {
      user.posts = user.posts.slice(0, limit);
    }

    return user;
  }

  async create(data: Partial<User>): Promise<User> {
    if (!data.password) throw new BadRequestException('Password wajib diisi');
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }


}
