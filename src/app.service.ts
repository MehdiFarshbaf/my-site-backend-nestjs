import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async findAll() {
    return await this.prisma.post.findMany();
  }
}
