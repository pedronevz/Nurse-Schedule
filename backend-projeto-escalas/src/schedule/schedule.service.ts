import { Injectable } from '@nestjs/common';
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
      const { nurseId, day, shift_type } = scheduleDto;
      const insertQuery = `
          INSERT INTO schedules (nurse_id, day, shift_type)
          VALUES ($1, $2, $3)
          RETURNING *;
      `;
      return this.databaseService.query(insertQuery, [nurseId, day, shift_type]);
  }
}