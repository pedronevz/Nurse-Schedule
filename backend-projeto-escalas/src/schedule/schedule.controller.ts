import { Controller, Get, Param } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Controller('schedules')
export class ScheduleController {
  constructor(private scheduleService: ScheduleService) {}

  @Get('/:year/:month')
  getSchedule(@Param('year') year: number, @Param('month') month: number) {
    return this.scheduleService.getScheduleForMonth(year, month);
  }
}