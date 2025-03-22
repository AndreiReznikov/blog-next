import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma.service';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  providers: [PostService, PrismaService, JwtService, UserService],
  controllers: [PostController],
})
export class PostModule {}
