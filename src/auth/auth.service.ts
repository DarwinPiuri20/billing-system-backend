import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { PrismaService } from '../services/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      return 'User with this email already exists';
    }
    const passwordHash: string = await bcrypt.hash(createUserDto.password, 10);

    try {
      const user = await this.prismaService.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: passwordHash,
          id_card: createUserDto.id_card,
          location: createUserDto.location,
          phone: createUserDto.phone,
          role: createUserDto.role,
        },
      });
      return { user, message: 'User created successfully' };
    } catch (error) {
      console.log(error);
      return 'Error creating user';
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { email: loginDto.email },
      });

      // Check if user exists
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const isPasswordMatch = await bcrypt.compare(
        loginDto.password,
        user?.password || '',
      );
      // Check if password matches
      if (!isPasswordMatch) {
        throw new Error('Invalid email or password');
      }
      const payload = { email: user.email, sub: user.id, role: user.role };
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      };
    } catch (error) {
      console.log(error);
      return 'Error logging in';
    }
  }
}
