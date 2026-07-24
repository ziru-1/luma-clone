import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Attendee } from '../generated/prisma/client';
import { AttendeeDto, AttendeeStatus } from '@luma-clone/types';

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}

  async create(eventId: string, userId: string): Promise<Attendee> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
    });
    if (!event) throw new NotFoundException('Event not found');

    if (event.hostId === userId) {
      throw new ConflictException(
        'You are the host of this event, no need to RSVP',
      );
    }

    const existing = await this.prisma.attendee.findUnique({
      where: { eventId_userId: { eventId, userId } },
    });
    if (existing)
      throw new ConflictException('Already responded to this event');

    return this.prisma.attendee.create({
      data: {
        eventId,
        userId,
        status: event.requiresApproval ? 'PENDING' : 'GOING',
      },
    });
  }

  async findAllForEvent(eventId: string): Promise<Attendee[]> {
    return this.prisma.attendee.findMany({ where: { eventId } });
  }

  toAttendeeDto(attendee: Attendee): AttendeeDto {
    return {
      id: attendee.id,
      eventId: attendee.eventId,
      userId: attendee.userId,
      status: attendee.status as unknown as AttendeeStatus,
      createdAt: attendee.createdAt.toISOString(),
      updatedAt: attendee.updatedAt.toISOString(),
    };
  }
}
