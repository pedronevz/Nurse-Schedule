import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ScheduleService {
  constructor(private databaseService: DatabaseService) {}

  async getScheduleForMonth(year: number, month: number): Promise<any[]> {
    return this.databaseService.query('SELECT * FROM schedules WHERE year = $1 AND month = $2', [year, month]);
  }

  async updateSchedule(scheduleId: number, newDetails: any): Promise<void> {
    await this.databaseService.query('UPDATE schedules SET details = $1 WHERE id = $2', [newDetails, scheduleId]);
  }
}