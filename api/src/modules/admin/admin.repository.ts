import { Injectable } from '@nestjs/common';
import { admin } from '@prisma/client';
import { PrismaException } from 'src/config/prisma/prisma.exception';
import { PrismaService } from 'src/config/prisma/prisma.service';

@Injectable()
export class AdminRepository {
  constructor(private readonly prismaServie: PrismaService) {}

  async getUserByEmail(email: string): Promise<Omit<admin,'user'>> {
    try {
      return this.prismaServie.admin.findFirst({
        select: { id: true, password: true },
        where: {  user:email},
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
