import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';

@Module({
  controllers: [CommentController],
  providers: [
    CommentService,
    PrismaService,
    JwtService,
    UserService,
    NotificationsGateway,
  ],
})
export class CommentModule {}
