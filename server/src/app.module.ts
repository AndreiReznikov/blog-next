import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import { PrismaService } from './prisma.service';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PostModule,
    AuthModule,
    NotificationsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
