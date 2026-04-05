import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsNumber()
  price: number;

  @IsNumber()
  stock: number;

  @IsString()
  sku_code: string;
}
