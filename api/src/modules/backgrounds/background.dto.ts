import { IsEnum, IsNotEmpty } from 'class-validator';
import { ProductEnum } from '../products/product.enum';

export class CreateBackgroundDto {
  @IsEnum(ProductEnum)
  name: string;

  @IsNotEmpty()
  color: string;
}
export class UpdateBackgroundDto {
  @IsEnum(ProductEnum)
  name: string;

  @IsNotEmpty()
  color: string;
}


