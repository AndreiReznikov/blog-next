import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService, JwtService],
  controllers: [PostController],
})
export class PostModule {}
