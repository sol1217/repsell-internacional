import { Global, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Global()
@Module({ providers: [ProductService, ProductRepository], controllers: [ProductController] })
export class ProductModule {}
