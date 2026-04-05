import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password is too short' })
  @MaxLength(20, { message: 'Password is too long' })
  password: string;

  @IsString()
  @MinLength(2, { message: 'Name is too short' })
  name: string;

  @IsString()
  id_card: string;

  @IsString()
  location: string;

  @IsString()
  phone: string;

  @IsEnum(Role, {
    message: `Role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}
