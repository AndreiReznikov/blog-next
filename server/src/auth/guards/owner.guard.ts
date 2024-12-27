import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PostService } from 'src/post/post.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
    private readonly postsService: PostService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const postId = Number(request.params?.id);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      const user = await this.userService.findById(payload.sub.name.id);

      if (!user) throw new UnauthorizedException('User not found');

      const post = await this.postsService.findById(postId);

      if (!post) {
        throw new ForbiddenException('Post not found');
      }

      if (post.authorId !== user.id) {
        throw new ForbiddenException(
          'You do not have permission to delete this post',
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
