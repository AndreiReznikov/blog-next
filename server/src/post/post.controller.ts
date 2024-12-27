import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OwnerGuard } from 'src/auth/guards/owner.guard';
import { PostService } from './post.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtGuard)
  @Get()
  async getAllPosts() {
    return await this.postService.findAll();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async getPost(@Param('id') id: number) {
    return await this.postService.findById(id);
  }

  @UseGuards(JwtGuard, OwnerGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return await this.postService.deleteById(id);
  }

  @UseGuards(JwtGuard)
  @Post('add')
  async createPost(@Body() dto: CreatePostDto) {
    return await this.postService.create(dto);
  }

  @UseGuards(JwtGuard, OwnerGuard)
  @Post(':id')
  async updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return await this.postService.update(id, dto);
  }
}
