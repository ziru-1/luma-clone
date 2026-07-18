import {
  IsString,
  IsBoolean,
  IsDateString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  declare name: string;

  @IsBoolean()
  declare isPublic: boolean;

  @IsDateString()
  declare startTime: string;

  @IsDateString()
  declare endTime: string;

  @IsString()
  declare location: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  declare capacity?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  declare priceCents?: number;

  @IsBoolean()
  declare requiresApproval: boolean;
}
