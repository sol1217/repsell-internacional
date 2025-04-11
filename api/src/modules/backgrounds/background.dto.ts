import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductEnum } from '../products/product.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBackgroundDto {
  @ApiProperty({
    description: 'Product type name',
    enum: ProductEnum,
  })
  @IsEnum(ProductEnum)
  name: string;

  @ApiProperty({ description: 'Color of the background' })
  @IsNotEmpty()
  color: string;
}
export class UpdateBackgroundDto {
  @ApiProperty({
    description: 'Product type name',
    enum: ProductEnum,
  })
  @IsEnum(ProductEnum)
  name: string;

  @ApiProperty({ description: 'Color of the background' })
  @IsNotEmpty()
  color: string;
}
