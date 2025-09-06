import { IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsString()
  postId: string;

  @IsString()
  authorId: string;
}
