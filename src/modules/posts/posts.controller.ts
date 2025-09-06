import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.createPost(createPostDto);
  }

  @Get()
  async getAll() {
    return await this.postsService.getAllPosts();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.postsService.getPostById(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.updatePost(id, updatePostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.postsService.deletePost(id);
  }
}
