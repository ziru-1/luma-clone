import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import { PrismaService } from '../prisma/prisma.service';

const JWKS = createRemoteJWKSet(
  new URL(
    'https://fmcumjaoudnigylaokky.supabase.co/auth/v1/.well-known/jwks.json',
  ),
);

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or invalid Authorization header',
      );
    }

    const token = authHeader.split(' ')[1];

    let payload;
    try {
      const result = await jwtVerify(token, JWKS);
      payload = result.payload;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }

    req.user = payload;

    const supabaseId = payload.sub;
    if (!supabaseId) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const dbUser = await this.prisma.user.findUnique({
      where: { supabaseId },
    });

    if (!dbUser) {
      throw new UnauthorizedException('User not found in database');
    }

    req.dbUser = dbUser;
    return true;
  }
}
