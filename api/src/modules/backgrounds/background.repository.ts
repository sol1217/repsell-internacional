import { Injectable } from '@nestjs/common';
import { PrismaException } from 'src/config/prisma/prisma.exception';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateBackgroundDto, UpdateBackgroundDto } from './background.dto';
import { background } from '@prisma/client';

@Injectable()
export class BackgroundRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createBackground(createBackgroundDto: CreateBackgroundDto) {
    try {
      await this.prismaService.background.create({
        data: createBackgroundDto,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async getAllBackgrounds(): Promise<background[]> {
    try {
      const backgrounds = await this.prismaService.background.findMany();
      return backgrounds;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async getBackgroundById(id: number) {
    try {
      const background = await this.prismaService.background.findUnique({
        where: { id },
      });
      return background;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async updateBackgroundById(
    id: number,
    updateBackgroundDto: UpdateBackgroundDto,
  ) {
    try {
      await this.prismaService.background.update({
        where: { id },
        data: updateBackgroundDto,
      });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
