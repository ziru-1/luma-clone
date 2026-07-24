import { Controller, Post, Get, Param, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { AttendeesService } from './attendees.service';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('events/:eventId/attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Param('eventId') eventId: string, @Req() req: Request) {
    const attendee = await this.attendeesService.create(
      eventId,
      req.dbUser!.id,
    );
    return this.attendeesService.toAttendeeDto(attendee);
  }

  @Get()
  async findAll(@Param('eventId') eventId: string) {
    const attendees = await this.attendeesService.findAllForEvent(eventId);
    return attendees.map((a) => this.attendeesService.toAttendeeDto(a));
  }
}
