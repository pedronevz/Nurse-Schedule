import { BadRequestException, ConflictException, Injectable, Inject, forwardRef } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NurseService } from 'src/nurses/nurse.service';


@Injectable()
export class ScheduleService {
  constructor(private databaseService: DatabaseService, @Inject(forwardRef(() => NurseService)) private nurseSevice: NurseService) {}
    async findByNurseId(nurseId: number, year: number, month: number): Promise<any[]> {
      const query = `
          SELECT * FROM schedules WHERE nurse_id = $1
          AND year = $2
          AND month = $3;
      `;
      const result = await this.databaseService.query(query, [nurseId, year, month]);

      if (!result || result.length === 0){
          const notFoundError = new Error('Escala não existente!');
          notFoundError['statusCode'] = 404;
          throw notFoundError;
      }

      if (result.length >= 0) {
        const schedule = result[0].schedule;
        const daysInMonth = new Date(year, month, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
          if (!schedule[day]) {
            schedule[day] = "-";
          }
        }
  
        return { ...result[0], schedule };
      } 
    }
        
    async createSchedule(scheduleDto): Promise<any> {
      const { nurse_id, month, year, schedule } = scheduleDto;
      const days = new Date(year, month, 0).getDate();

      const checkId = `
      SELECT * FROM nurses WHERE id = $1;
      `;
      const nurseExists = await this.databaseService.query(checkId, [nurse_id]);

      if (nurseExists.length === 0 || !nurseExists) {
        throw new ConflictException('Enfermeiro não encontrado!');
      }

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

  async deleteAllNursesSchedules(nurseId: number): Promise<void> {
    const deleteQuery = `
      DELETE FROM schedules WHERE nurse_id = $1;
    `;
    await this.databaseService.query(deleteQuery, [nurseId]);
  }
}