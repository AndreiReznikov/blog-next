import { Injectable } from '@nestjs/common';
import { getCurrentDateString } from 'src/libs/Utils';
import { PrismaService } from 'src/prisma.service';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePostDto) {
    return await this.prisma.post.create({
      data: { ...dto, creationDate: getCurrentDateString() },
    });
  }

  async update(id: number, dto: UpdatePostDto) {
    await this.prisma.post.update({
      where: {
        id: id,
      },
      data: { ...dto },
    });

    return await this.findAll();
  }

  async findById(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id: id,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
      },
    });
  }

  async deleteById(id: number) {
    await this.prisma.post.delete({
      where: {
        id: id,
      },
    });

    return await this.findAll();
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: { author: true },
    });
  }
}
