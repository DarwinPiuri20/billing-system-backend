import { Module, Global } from '@nestjs/common';
import { PrismaService } from '../src/services/prisma.service.js';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
