import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { UpdateCommentDto } from './dtos/update-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto:CreateCommentDto){
        return await this.commentsService.createComment(createCommentDto)
    }

    @Get('post/:postId')
    async getByPost(@Param('postId') postId:string){
        return await this.commentsService.getCommentsForPost(postId)
    }

    @Put(':id')
    async update(@Param('id') id:string, @Body() updateCommentDto:UpdateCommentDto){
        return await this.commentsService.updateComment(id,updateCommentDto)
    }

    @Delete(':id')
    async delete(@Param('id') id:string){
        return await this.commentsService.deleteComment(id)
    }
}
