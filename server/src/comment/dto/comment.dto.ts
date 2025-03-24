import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  text: string;

  @IsNumber()
  authorId: number;

  @IsNumber()
  postId: number;
}

export class DeleteCommentDto {
  @IsNumber()
  authorId: number;

  @IsNumber()
  postId: number;

  @IsNumber()
  commentId: number;
}
