import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductEnum } from './product.enum';
import { isEnum, isInt } from 'class-validator';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './product.model';
import { AuthGuard } from 'src/core/guards/auth.guard';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private validateProductType(productType: string): void {
    if (!isEnum(productType, ProductEnum)) {
      throw new BadRequestException('Invalid product type');
    }
  }

  private validateProductId(id: number): void {
    if (!isInt(id)) throw new BadRequestException('Invalid product id');
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
  @ApiParam({
    name: 'productType',
    required: true,
    enum: ProductEnum,
  })
  @UseGuards(AuthGuard)
  @Post('/:productType')
  async createProduct(
    @Param('productType') productType: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    this.validateProductType(productType);
    return this.productService.createProduct(productType, createProductDto);
  }

  @ApiOperation({
    summary: 'Get all products by type',
    description: 'Get all products of a specific type',
    responses: {
      200: {
        description: 'Products retrieved successfully',
      },
      400: {
        description: 'Invalid product type',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @ApiParam({
    name: 'productType',
    required: true,
    enum: ProductEnum,
  })
  @Get('/:productType')
  async getAllProductsByType(@Param('productType') productType: string) {
    this.validateProductType(productType);
    return this.productService.getAllProductsByType(productType);
  }

  @ApiOperation({
    summary: 'Get a product by id',
    description: 'Get a product of a specific type by id',
    responses: {
      200: {
        description: 'Product retrieved successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      500: {
        description: 'Internal server error',
      },
    },
  })
  @ApiParam({
    name: 'productType',
    required: true,
    enum: ProductEnum,
  })
  @Get('/:productType/:id')
  async getProductById(
    @Param('productType') productType: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.validateProductType(productType);
    this.validateProductId(id);

    return this.productService.getProductById(productType, id);
  }

  @ApiOperation({
    summary: 'Update a product by id',
    description: 'Update a product of a specific type by id',
    responses: {
      200: {
        description: 'Product updated successfully',
      },
      400: {
        description: 'Invalid product type or id',
      },
      500: { description: 'Internal server error' },
    },
  })
  @ApiParam({
    name: 'productType',
    required: true,
    enum: ProductEnum,
  })
  @Patch('/:productType/:id')
  async updateProduct(
    @Param('productType') productType: string,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.validateProductType(productType);
    this.validateProductId(id);

    return this.productService.updateProductById(
      productType,
      id,
      updateProductDto,
    );
  }

  @ApiOperation({
    summary: 'Delete a product by id',
    description: 'Delete a product of a specific type by id',
    responses: {
      200: {
        description: 'Product deleted successfully',
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
  @ApiParam({
    name: 'productType',
    required: true,
    enum: ProductEnum,
  })
  @UseGuards(AuthGuard)
  @Delete('/:productType/:id')
  async deleteProduct(
    @Param('productType') productType: string,
    @Param('id', ParseIntPipe) id: number,
  ) {
    this.validateProductType(productType);
    this.validateProductId(id);

    return this.productService.deleteProductById(productType, id);
  }
}
