import { Controller, Get, Param, Query, Body, Post, NotFoundException } from '@nestjs/common';
import { ScheduleService } from './schedule.service';


@Controller('schedule')
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}
        @Get('/:nurseId/:year/:month')
        findByNurseId(@Param('nurseId') nurseId: number, @Param('year') year: number, @Param ('month') month: number) {
            const result = this.scheduleService.findByNurseId(nurseId, year, month);
            if (!result) {
                throw new NotFoundException('Sem escala');
            }
            return result;
        }
    
        @Post('/')
        createSchedule(@Body() scheduleDto) {
            return this.scheduleService.createSchedule(scheduleDto);
        }
}
  