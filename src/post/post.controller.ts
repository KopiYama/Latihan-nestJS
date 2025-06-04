import { Controller, Get, Post as HttpPost, Body, Param, Put, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<PostEntity> {
    return this.postService.findOne(id);
  }

  @HttpPost()
  create(@Body() postData: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.create(postData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<PostEntity>): Promise<PostEntity> {
    return this.postService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.postService.remove(id);
  }
}
