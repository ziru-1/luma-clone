import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import type { Request } from 'express';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req: Request, @Body() dto: CreateEventDto) {
    const event = await this.eventsService.create(req.dbUser!.id, dto);
    return this.eventsService.toEventDto(event);
  }

  @Get()
  async findAll() {
    const events = await this.eventsService.findAll();
    return events.map((e) => this.eventsService.toEventDto(e));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    if (!event) throw new NotFoundException('Event not found');
    return this.eventsService.toEventDto(event);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
  ) {
    const event = await this.eventsService.update(id, req.dbUser!.id, dto);
    return this.eventsService.toEventDto(event);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Req() req: Request, @Param('id') id: string) {
    await this.eventsService.remove(id, req.dbUser!.id);
    return { success: true };
  }
}
