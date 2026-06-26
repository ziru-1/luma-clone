import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async syncUser(
    supabaseId: string,
    email: string,
    name?: string,
    avatarUrl?: string,
  ): Promise<User> {
    return await this.prisma.user.upsert({
      where: { supabaseId },
      update: { name, avatarUrl },
      create: { supabaseId, email, name, avatarUrl },
    });
  }
}
