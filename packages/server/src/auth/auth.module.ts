import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt.guard';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [PrismaModule],
  providers: [AuthService, JwtGuard, RolesGuard],
  controllers: [AuthController],
})
export class AuthModule {}
