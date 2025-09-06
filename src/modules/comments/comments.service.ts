import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto) {
    try {
      return await this.prisma.comment.create({
        data: createCommentDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create comment',
        error.message,
      );
    }
  }

  async getCommentsForPost(postId: string) {
    try {
      return await this.prisma.comment.findMany({
        where: { postId },
        include: {
          author: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch comments for post with ID ${postId}`,
        error.message,
      );
    }
  }

  async updateComment(id: string, updateCommentDto: UpdateCommentDto) {
    try {
      return await this.prisma.comment.update({
        where: { id },
        data: updateCommentDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update comment with ID ${id}`,
        error.message,
      );
    }
  }

  async deleteComment(id: string) {
    try {
      return await this.prisma.comment.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete comment with ID ${id}`,
        error.message,
      );
    }
  }
}
