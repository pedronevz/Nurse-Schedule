import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { DatabaseService } from 'src/database/database.service';

@Controller('schedule')
export class ScheduleController {
    constructor(private databaseService: DatabaseService) {}

    @Get()
    async getSchedule(@Query('month') month: number, @Query('year') year: number) {
        const escalas = await this.databaseService.query(
            'SELECT * FROM escalas WHERE month = $1 AND year = $2', [month, year]
        );
        return escalas;
    }

    @Post()
    async addSchedule(@Body() scheduleData: { nurse_id: number; day: number; shift_id: string; month: number; year: number }) {
        const newSchedule = await this.databaseService.query(
            'INSERT INTO escalas (nurse_id, day, shift_id, month, year) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [scheduleData.nurse_id, scheduleData.day, scheduleData.shift_id, scheduleData.month, scheduleData.year]
        );
        return newSchedule;
    }
}