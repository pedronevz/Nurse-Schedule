import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';


@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}
        @Get('/:nurseId')
        findByNurseId(@Param('nurseId') nurseId: number) {
            return this.scheduleService.findByNurseId(nurseId);
        }
    
        @Post('/')
        createSchedule(@Body() scheduleDto) {
            return this.scheduleService.createSchedule(scheduleDto);
        }
}
  