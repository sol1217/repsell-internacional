import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseEnumPipe,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BackgroundService } from './background.service';
import { background } from '@prisma/client';
import { ApiOperation } from '@nestjs/swagger';
import { CreateBackgroundDto, UpdateBackgroundDto } from './background.dto';
import { ProductEnum } from '../products/product.enum';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('backgrounds')
export class BackgroundController {
  constructor(private readonly backgroundService: BackgroundService) {}

  @ApiOperation({
    summary: 'Create a Background',
    description: 'Create a background of a product of specific type',
    responses: {
      201: {
        description: 'Background created successfully',
      },
      400: {
        description: 'Invalid creation parameters',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @UseGuards(AuthGuard)
  @Post()
  async createBackground(
    @Body() createBackgroundDto: CreateBackgroundDto,
  ): Promise<background> {
    return this.backgroundService.createBackground(createBackgroundDto);
  }

  @ApiOperation({
    summary: 'Get all Backgrounds',
    description: 'Return all backgrounds',
    responses: {
      200: {
        description: 'Ok',
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
    summary: 'Get Background by name',
    description: 'return a specific background given the name (Product Type)',
    responses: {
      200: {
        description: 'ok',
      },
      400: {
        description: 'Invalid product type',
      },
      500: {
        description: 'Internal server error',
      },
    },
    parameters: [{
      name: 'productType',
      in: 'path',
      required: true,
      schema: { enum: Object.values(ProductEnum) },
      description: 'The product type'
    }]
  })
  @Get('/:productType')
  async getBackgroundByName(
    @Param('productType', new ParseEnumPipe(ProductEnum)) producType: string,
  ): Promise<background> {
    return this.backgroundService.getBackgroundByName(producType);
  }

  @ApiOperation({
    summary: 'Update Background',
    description: 'Update a background given his id',
    responses: {
      200: {
        description: 'Background updated successfully',
      },
      400: {
        description: 'Invalid id',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'int' },
      description: 'The product type'
    }]
  })
  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateBackgroundById(@Param('id', new ParseIntPipe()) id:number, @Body() updateBackgroundDto:UpdateBackgroundDto){
    return this.backgroundService.updateBackgroundById(id,updateBackgroundDto)
  }

  @ApiOperation({
    summary: 'Delete Background',
    description: 'Delete a Background by id',
    responses: {
      200: {
        description: 'Background deleted successfully',
      },
      400: {
        description: 'Invalid id',
      },
      401: {
        description: 'Unauthorized',
      },
      500: {
        description: 'Internal server error',
      },
    },
    parameters: [{
      name: 'id',
      in: 'path',
      required: true,
      schema: { type: 'int' },
      description: 'The product type'
    }]
  })
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBackgroundById(@Param('id', new ParseIntPipe()) id:number, ):Promise<void>{
    await this.backgroundService.deleteBackgroundById(id)
  }

}
