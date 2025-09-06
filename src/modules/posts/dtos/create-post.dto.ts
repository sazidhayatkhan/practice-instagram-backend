import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  caption?: string;

  @IsUrl()
  imageUrl: string;
}
