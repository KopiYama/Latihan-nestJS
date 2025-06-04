// src/user/user.controller.ts

import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @HttpPost()
  create(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }

  @Get('filter/email')
  filterByEmail(
    @Query('email') email: string,
    @Query('limit') limit?: number,
  ): Promise<User[]> {
    return this.userService.findByEmail(email, limit);
  }

  @Get(':id/posts')
  getUserPosts(
    @Param('id') id: number,
    @Query('limit') limit?: number,
  ): Promise<Partial<User>> {
    return this.userService.getUserWithPosts(id, limit);
  }

}
