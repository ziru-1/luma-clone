import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event } from '../generated/prisma/client';
import { EventDto } from '@luma-clone/types';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async create(hostId: string, dto: CreateEventDto): Promise<Event> {
    return this.prisma.event.create({
      data: {
        ...dto,
        startTime: new Date(dto.startTime),
        endTime: new Date(dto.endTime),
        hostId,
      },
    });
  }

  async findAll(): Promise<Event[]> {
    return this.prisma.event.findMany();
  }

  async findOne(id: string): Promise<Event | null> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  private async assertOwnership(
    id: string,
    requesterId: string,
  ): Promise<void> {
    const event = await this.prisma.event.findUnique({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    if (event.hostId !== requesterId) {
      throw new ForbiddenException(
        'You do not have permission to modify this event',
      );
    }
  }

  async update(
    id: string,
    requesterId: string,
    dto: UpdateEventDto,
  ): Promise<Event> {
    await this.assertOwnership(id, requesterId);

    const data = {
      ...dto,
      ...(dto.startTime && { startTime: new Date(dto.startTime) }),
      ...(dto.endTime && { endTime: new Date(dto.endTime) }),
    };
    return this.prisma.event.update({ where: { id }, data });
  }

  async remove(id: string, requesterId: string): Promise<Event> {
    await this.assertOwnership(id, requesterId);
    return this.prisma.event.delete({ where: { id } });
  }

  toEventDto(event: Event): EventDto {
    return {
      id: event.id,
      hostId: event.hostId,
      name: event.name,
      isPublic: event.isPublic,
      startTime: event.startTime.toISOString(),
      endTime: event.endTime.toISOString(),
      location: event.location,
      capacity: event.capacity,
      priceCents: event.priceCents,
      requiresApproval: event.requiresApproval,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    };
  }
}
