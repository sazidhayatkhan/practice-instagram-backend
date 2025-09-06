import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateLikeDto } from './dtos/create-like.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async likePost(createLikeDto: CreateLikeDto) {
    try {
      return await this.prisma.like.create({
        data: createLikeDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to like the post',
        error.message,
      );
    }
  }

  async unlikePost(postId: string, userId: string) {
    try {
      return await this.prisma.like.delete({
        where: {
          postId_userId: { postId, userId },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to unlike post with ID ${postId} for user ${userId}`,
        error.message,
      );
    }
  }

  async getLikesForPost(postId: string) {
    try {
      return await this.prisma.like.findMany({
        where: { postId },
        include: { user: true },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch likes for post with ID ${postId}`,
        error.message,
      );
    }
  }
}
