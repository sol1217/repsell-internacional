import { ApiProperty } from '@nestjs/swagger';
import {
  IsBase64,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Throphie Name',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  name: string;

  @ApiProperty({
    description: 'Product category',
    example: 'Throphie Category',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 100)
  category: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Throphie Description',
    required: true,
    type: String,
    minLength: 3,
  })
  @IsString()
  @Length(3)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Product color',
    examples: ['Oro', 'Plata', 'Oro, Bronce'],
    required: true,
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  color: string;

  @ApiProperty({
    description: 'Product image',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    required: true,
    type: String,
  })
  @IsBase64()
  image: string;

  @ApiProperty({
    description: 'Product height',
    example: '10',
    required: true,
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  height: string;
}
export class UpdateProductDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Throphie Name',
    required: false,
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  name?: string;

  @ApiProperty({
    description: 'Product category',
    example: 'Throphie Category',
    required: false,
    type: String,
    minLength: 3,
    maxLength: 100,
  })
  @IsOptional()
  @IsString()
  @Length(3, 100)
  category?: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Throphie Description',
    required: false,
    type: String,
    minLength: 3,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Product color',
    examples: ['Oro', 'Plata', 'Oro, Bronce'],
    required: false,
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  color?: string;

  @ApiProperty({
    description: 'Product image',
    example: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiProperty({
    description: 'Product height',
    example: '10',
    required: false,
    type: String,
    minLength: 3,
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @Length(3, 50)
  height?: string;
}
