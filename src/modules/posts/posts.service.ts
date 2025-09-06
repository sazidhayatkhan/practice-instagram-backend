import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost(createPostDto: CreatePostDto) {
    try {
      return await this.prisma.post.create({
        data: createPostDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to create post',
        error.message,
      );
    }
  }

  async getAllPosts() {
    try {
      return await this.prisma.post.findMany({
        include: {
          author: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
          comments: true,
          likes: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch posts',
        error.message,
      );
    }
  }

  async getPostById(id: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { id },
        include: {
          author: {
            select: {
              username: true,
              avatarUrl: true,
            },
          },
          comments: true,
          likes: true,
        },
      });
      if (!post) {
        throw new NotFoundException(`Post with ID ${id} not found`);
      }
      return post;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException(
        'Failed to fetch post',
        error.message,
      );
    }
  }

  async updatePost(id: string, updatePostDto: UpdatePostDto) {
    try {
      return await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to update post with ID ${id}`,
        error.message,
      );
    }
  }

  async deletePost(id: string) {
    try {
      return await this.prisma.post.delete({
        where: { id },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete post with ID ${id}`,
        error.message,
      );
    }
  }
}
