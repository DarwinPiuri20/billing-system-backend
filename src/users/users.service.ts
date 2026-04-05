import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../services/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    try {
      return this.prismaService.user.findMany({
        where: { isActive: true },
        select: {
          id: true,
          name: true,
          email: true,
          id_card: true,
          location: true,
          phone: true,
          role: true,
        },
      });
    } catch (error) {
      console.log(error);
      return 'Error fetching users';
    }
  }

  async findOne(id: number) {
    try {
      return this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          id_card: true,
          location: true,
          phone: true,
          role: true,
        },
      });
    } catch (error) {
      console.log(error);
      return 'Error fetching user';
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      console.log(error);
      return 'Error updating user';
    }
  }

  async remove(id: number) {
    try {
      return this.prismaService.user.update({
        where: { id },
        data: {
          isActive: false,
          deleted_at: new Date(),
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    } catch (error) {
      console.log(error);
      return 'Error deleting user';
    }
  }
}
