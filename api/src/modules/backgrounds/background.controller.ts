import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { BackgroundService } from './background.service';
import { background } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';
import { CreateBackgroundDto, UpdateBackgroundDto } from './background.dto';

@Controller('backgrounds')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @ApiOperation({
    summary: 'Create a product',
    description: 'Create a product of a specific type',
    responses: {
      201: {
        description: 'Product created successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Post()
  async createBackground(
    @Body() createBackgroundDto: CreateBackgroundDto,
  ): Promise<background> {
    return this.backgroundService.createBackground(createBackgroundDto);
  }

  @ApiOperation({
    summary: 'Create a product',
    description: 'Create a product of a specific type',
    responses: {
      201: {
        description: 'Product created successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Get()
  async getAll(): Promise<background[]> {
    return this.backgroundService.getAllBackgrounds();
  }

  @ApiOperation({
    summary: 'Create a product',
    description: 'Create a product of a specific type',
    responses: {
      201: {
        description: 'Product created successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Get('/:id')
  async getBackgroundById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<background> {
    return this.backgroundService.getBackgroundById(id);
  }

  @ApiOperation({
    summary: 'Create a product',
    description: 'Create a product of a specific type',
    responses: {
      201: {
        description: 'Product created successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Patch(':id')
  async updateBackgroundById(@Param('id', new ParseIntPipe()) id:number, @Body() updateBackgroundDto:UpdateBackgroundDto){
    return this.backgroundService.updateBackgroundById(id,updateBackgroundDto)
  }

  @ApiOperation({
    summary: 'Create a product',
    description: 'Create a product of a specific type',
    responses: {
      201: {
        description: 'Product created successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @Delete(':id')
  async deleteBackgroundById(@Param('id', new ParseIntPipe()) id:number, ):Promise<void>{
    await this.backgroundService.deleteBackgroundById(id)
  }

}
