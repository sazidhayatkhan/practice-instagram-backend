import { Controller, Post, Delete, Get, Body, Param } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dtos/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  async like(@Body() createLikeDto: CreateLikeDto) {
    return await this.likesService.likePost(createLikeDto);
  }

  @Delete(':postId/:userId')
  async unlike(
    @Param('postId') postId: string,
    @Param('userId') userId: string,
  ) {
    return await this.likesService.unlikePost(postId, userId);
  }

  @Get('post/:postId')
  async getByPost(@Param('postId') postId: string) {
    return await this.likesService.getLikesForPost(postId);
  }
}
