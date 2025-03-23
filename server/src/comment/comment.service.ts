import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationsGateway } from '../notifications/notifications.gateway';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createComment(postId: number, authorId: number, text: string) {
    if (postId === undefined || authorId === undefined) {
      throw new Error('postId and authorId are required');
    }

    const postExists = await this.prisma.post.findUnique({
      where: { id: postId },
    });
    if (!postExists) {
      throw new Error('The post was not found');
    }

    const authorExists = await this.prisma.user.findUnique({
      where: { id: authorId },
    });
    if (!authorExists) {
      throw new Error('The author was not found');
    }

    const comment = await this.prisma.comment.create({
      data: {
        text,
        creationDate: new Date().toISOString(),
        author: { connect: { id: authorId } },
        post: { connect: { id: postId } },
      },
      include: { author: true },
    });

    this.notificationsGateway.sendNotification(postId, {
      comment: comment.text,
      authorId: comment.authorId,
      authorName: comment.author.name,
    });

    return comment;
  }

  async getCommentsByPostId(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }
}
