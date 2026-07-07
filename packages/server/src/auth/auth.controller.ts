import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
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
  getMe(@Req() req: Request) {
    return this.authService.toUserDto(req.dbUser!);
  }
}
