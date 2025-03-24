import {
  Controller,
  Post,
  Get,
  Param,
  UseGuards,
  Body,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteCommentDto } from './dto/comment.dto';
import { CommentGuard } from 'src/auth/guards/comment.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtGuard)
  @Post('add')
  async createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }

  @UseGuards(JwtGuard, CommentGuard)
  @Delete('delete')
  async deleteComment(@Body() dto: DeleteCommentDto) {
    return this.commentService.deleteComment(dto);
  }

  @UseGuards(JwtGuard)
  @Get(':postId')
  async getCommentsByPostId(@Param('postId') postId: number) {
    return this.commentService.getCommentsByPostId(postId);
  }
}
