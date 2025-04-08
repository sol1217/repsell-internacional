import { Injectable } from '@nestjs/common';
import { PrismaException } from 'src/config/prisma/prisma.exception';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateBackgroundDto, UpdateBackgroundDto } from './background.dto';
import { background } from '@prisma/client';

@Injectable()
export class BackgroundRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createBackground(createBackgroundDto: CreateBackgroundDto):Promise<background> {
    try {
      return await this.prismaService.background.create({
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

  async getBackgroundByName(name: string) {
    try {
      const background = await this.prismaService.background.findFirst({
        where: { name },
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

  async deleteBackgroundById(id: number): Promise<void> {
    try {
      await this.prismaService.background.delete({ where: { id } });
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
