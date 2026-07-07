import { UserDto, Role as UserDtoRole } from '@luma-clone/types';
import { Injectable } from '@nestjs/common';
import { User } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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

  toUserDto(user: User): UserDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      role: user.role as unknown as UserDtoRole,
    };
  }

  async getUserById(supabaseId: string) {
    return this.prisma.user.findUnique({
      where: { supabaseId },
    });
  }
}
