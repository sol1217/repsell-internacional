import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDto, UpdateProductDto } from "./product.dto";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}
    
    async createProduct(productType: string, createProductDto: CreateProductDto):Promise<Product>{
        return this.productRepository.createProduct(productType, createProductDto);
    }

    async getAllProductsByType(productType: string) {
        return this.productRepository.getAllProductsByType(productType);
    }

    async getProductById(productType: string, id: number) {
        return this.productRepository.getProductById(productType, id);
    }
    async updateProductById(
        productType: string,
        id: number,
        updateProductDto: UpdateProductDto,
    ) {
        return this.productRepository.updateProductById(productType, id, updateProductDto);
    }

    async deleteProductById(productType: string, id: number) {
        return this.productRepository.deleteProductById(productType, id);
    }
}