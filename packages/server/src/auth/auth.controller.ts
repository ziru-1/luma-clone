import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import { AuthService } from './auth.service';
import { SyncUserDto } from './dto/sync-user.dto';
import { JwtGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sync')
  async syncUser(@Body() body: SyncUserDto) {
    return this.authService.syncUser(
      body.supabaseId,
      body.email,
      body.name,
      body.avatarUrl,
    );
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const supabaseId = req.user?.sub;
    if (!supabaseId) {
      throw new NotFoundException('Invalid token payload');
    }

    const user = await this.authService.getUserById(supabaseId);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
