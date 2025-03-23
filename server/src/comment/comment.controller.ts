import { Body, Controller, Post, Get, Param, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  async createComment(
    @Body('postId') postId: number,
    @Body('authorId') authorId: number,
    @Body('text') text: string,
  ) {
    return this.commentService.createComment(postId, authorId, text);
  }

  @UseGuards(JwtGuard)
  @Get(':postId')
  async getCommentsByPostId(@Param('postId') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }
}
