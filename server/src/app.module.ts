import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, PostModule, AuthModule],
  providers: [PrismaService],
})
export class AppModule {}
