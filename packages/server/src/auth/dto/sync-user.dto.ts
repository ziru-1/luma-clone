import { IsString, IsEmail, IsOptional } from 'class-validator';

export class SyncUserDto {
  @IsString()
  declare supabaseId: string;

  @IsEmail()
  declare email: string;

  @IsOptional()
  @IsString()
  declare name?: string;

  @IsOptional()
  @IsString()
  declare avatarUrl?: string;
}
