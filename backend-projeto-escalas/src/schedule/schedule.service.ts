import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';


@Injectable()
export class ScheduleService {
  constructor(private databaseService: DatabaseService) {}
    async findByNurseId(nurseId: number): Promise<any[]> {
        const query = `
            SELECT * FROM schedules WHERE nurse_id = $1;
        `;
        return this.databaseService.query(query, [nurseId]);
    }
    
    async createSchedule(scheduleDto): Promise<any> {
      const { nurse_id, month, year, schedule } = scheduleDto;
      const days = new Date(year, month, 0).getDate();

      if (Object.keys(schedule).length > days){
        throw new BadRequestException('Schedule does not match the number of days in the specified month.');
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