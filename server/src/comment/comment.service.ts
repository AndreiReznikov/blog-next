import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';

import { getCurrentDateString } from 'src/libs/Utils';

@Injectable()
export class CommentService {
  constructor(
    private prisma: PrismaService,
    private notificationsGateway: NotificationsGateway,
  ) {}

  async createComment({ postId, authorId, text }) {
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
        creationDate: getCurrentDateString(),
        author: { connect: { id: authorId } },
        post: { connect: { id: postId } },
      },
      include: { author: true },
    });

    this.notificationsGateway.sendNotification(postId, {
      comment: comment.text,
      authorName: comment.author.name,
      type: 'ADD',
    });

    return comment;
  }

  async deleteComment({ postId, commentId, authorId }) {
    if (authorId === undefined) {
      throw new Error('authorId are required');
    }

    const commentExists = await this.prisma.comment.findUnique({
      where: { id: commentId, authorId },
    });

    const author = await this.prisma.user.findUnique({
      where: { id: authorId },
    });

    if (!commentExists) {
      throw new Error('The comment was not found');
    }

    const comment = await this.prisma.comment.delete({
      where: {
        id: commentId,
      },
    });

    this.notificationsGateway.sendNotification(postId, {
      comment: comment.text,
      authorName: author.name,
      type: 'DELETE',
    });

    return comment;
  }

  async getCommentsByPostId(postId: number) {
    return this.prisma.comment.findMany({
      where: { postId },
      include: { author: true },
    });
  }

  async getCommentById(id: number) {
    return this.prisma.comment.findUnique({
      where: { id },
    });
  }
}
