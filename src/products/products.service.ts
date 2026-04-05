import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../services/prisma.service.js';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const sku = this.generateUniqueSku(createProductDto);

      return await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          category: createProductDto.category,
          brand: createProductDto.brand,
          price: createProductDto.price,
          stock: createProductDto.stock,
          sku_code: sku,
        },
      });
    } catch (error) {
      console.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }
  //generate unique SKU code based on category, brand, name and random number
  private generateUniqueSku(createProductDto: CreateProductDto) {
    const prefix = createProductDto.category.substring(0, 3).toUpperCase();
    const brandPart = createProductDto.brand.substring(0, 3).toUpperCase();
    const namePart = createProductDto.name.substring(0, 3).toUpperCase();
    const random = Math.floor(1000 + Math.random() * 9000);
    return `${prefix}-${namePart}-${random}-${brandPart}`;
  }

  findAll() {
    try {
      return this.prisma.product.findMany();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({
        where: { id: Number(id) },
      });
      if (!product) {
        throw new Error('Product not found');
      }

      return product;
    } catch (error) {
      console.error(`Error fetching product with id ${id}:`, error);
      throw new Error('Failed to fetch product');
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return this.prisma.product.update({
        where: { id },
        data: updateProductDto,
        select: {
          id: true,
          name: true,
          category: true,
        },
      });
    } catch (error) {
      console.error(`Error updating product with id ${id}:`, error);
      throw new Error('Failed to update product');
    }
  }

  async remove(id: number) {
    try {
      return this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error deleting product with id ${id}:`, error);
      throw new Error('Failed to delete product');
    }
  }
}
