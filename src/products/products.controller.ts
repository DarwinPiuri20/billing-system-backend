import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      return this.productsService.create(createProductDto);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new Error('Failed to create product');
    }
  }

  @Get()
  async findAll() {
    try {
      return this.productsService.findAll();
    } catch (error) {
      console.error('Error in controller:', error);
      throw new Error('Failed to fetch products');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    try {
      return this.productsService.findOne(id);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new Error('Failed to fetch product');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    try {
      return this.productsService.update(+id, updateProductDto);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new Error('Failed to update product');
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.productsService.remove(+id);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new Error('Failed to delete product');
    }
  }
}
