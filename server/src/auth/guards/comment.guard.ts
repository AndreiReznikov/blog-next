import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { CommentService } from 'src/comment/comment.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly commentService: CommentService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const commentId = request?.body?.commentId;

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const user = await this.userService.findById(payload.sub.name.id);

      if (!user) throw new UnauthorizedException('User not found');

      const comment = await this.commentService.getCommentById(commentId);

      if (!comment) {
        throw new ForbiddenException('Comment not found');
      }

      if (comment.authorId !== user.id) {
        throw new ForbiddenException(
          'You do not have access to edit this comment',
        );
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
