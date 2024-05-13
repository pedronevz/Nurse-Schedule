import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class ScheduleService {
  constructor(private databaseService: DatabaseService) {}
    async findByNurseId(nurseId: number, year: number, month: number): Promise<any[]> {
        const query = `
            SELECT * FROM schedules WHERE nurse_id = $1
            AND year = $2
            AND month = $3;
        `;
        return this.databaseService.query(query, [nurseId, year, month]);
    }
    
    async createSchedule(scheduleDto): Promise<any> {
      const { nurse_id, month, year, schedule } = scheduleDto;
      const days = new Date(year, month, 0).getDate();

      if (Object.keys(schedule).length > days){
        throw new BadRequestException('Mais dias do que o mês suporta??.');
      }

      const insertQuery = `
          INSERT INTO schedules (nurse_id, month, year, schedule)
          VALUES ($1, $2, $3, $4)
          ON CONFLICT (nurse_id, month, year) 
          DO UPDATE SET schedule = EXCLUDED.schedule
          RETURNING *;
      `;
      return this.databaseService.query(insertQuery, [nurse_id, month, year, schedule]);
  }
}