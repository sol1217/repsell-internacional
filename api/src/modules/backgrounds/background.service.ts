import { Injectable } from '@nestjs/common';
import { BackgroundRepository } from './background.repository';
import { background } from '@prisma/client';
import { CreateBackgroundDto, UpdateBackgroundDto } from './background.dto';

@Injectable()
export class BackgroundService {
  constructor(private readonly backgroundRepository: BackgroundRepository) {}

  async createBackground(
    createBackgroundDto: CreateBackgroundDto,
  ): Promise<background> {
    return this.backgroundRepository.createBackground(createBackgroundDto);
  }
  async getAllBackgrounds(): Promise<background[]> {
    return this.backgroundRepository.getAllBackgrounds();
  }

  async getBackgroundById(id: number): Promise<background> {
    return this.backgroundRepository.getBackgroundById(id);
  }

  async updateBackgroundById(
    id: number,
    updateBackgroundDto: UpdateBackgroundDto,
  ): Promise<any> {
    return this.backgroundRepository.updateBackgroundById(
      id,
      updateBackgroundDto,
    );
  }

  async deleteBackgroundById(id: number): Promise<void> {
    this.backgroundRepository.deleteBackgroundById(id);
  }
}
