import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { PrismaException } from 'src/config/prisma/prisma.exception';
import { Product } from './product.model';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createProduct(
    productType: string,
    createProductDto: CreateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.prismaService[productType].create({
        data: createProductDto,
      });
      return product;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async getAllProductsByType(productType: string) {
    try {
      const products = await this.prismaService[productType].findMany();
      return products;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
  async getProductById(productType: string, id: number) {
    try {
      const product = await this.prismaService[productType].findUnique({
        where: { id },
      });
      return product;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
  async updateProductById(
    productType: string,
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.prismaService[productType].update({
        where: { id },
        data: updateProductDto,
      });
      return product;
    } catch (error) {
      throw new PrismaException(error);
    }
  }

  async deleteProductById(productType: string, id: number) {
    try {
      const product = await this.prismaService[productType].delete({
        where: { id },
      });
      return product;
    } catch (error) {
      throw new PrismaException(error);
    }
  }
}
