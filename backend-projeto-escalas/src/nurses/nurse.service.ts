import { ConflictException, Injectable, forwardRef, Inject } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ScheduleService } from 'src/schedule/schedule.service';

@Injectable()
export class NurseService {
  constructor(private databaseService: DatabaseService, @Inject(forwardRef(() => ScheduleService)) private scheduleService: ScheduleService) {}
    async findAllNurses(): Promise<any[]> {
      const query = `
          SELECT * FROM nurses;
      `;
      return await this.databaseService.query(query);
    }
  
    async findNurse(id: number): Promise<any[]> {
        const query = `
            SELECT * FROM nurses WHERE id = $1;
        `;
        return this.databaseService.query(query, [id]);
    }
    
    async create(nurseDto): Promise<any> {
      const { name, coren } = nurseDto;

      const checkCorenQuery = `
        SELECT id FROM nurses WHERE coren = $1;
      `;

      const nurseExists = await this.databaseService.query(checkCorenQuery, [coren]);
      if (nurseExists.length > 0) {
        throw new ConflictException('O COREN fornecido já está em uso por outro enfermeiro.');
      }

      const insertQuery = `
          INSERT INTO nurses (name, coren)
          VALUES ($1, $2)
          RETURNING *;
      `;
      return this.databaseService.query(insertQuery, [name, coren]);
  }

  async deleteNurse(id: number): Promise<void> {
    const checkId = `
      SELECT * FROM nurses WHERE id = $1;
    `;
    const nurseExists = await this.databaseService.query(checkId, [id]);

    if (nurseExists.length === 0 || !nurseExists) {
      throw new ConflictException('Enfermeiro não encontrado!');
    }

    await this.scheduleService.deleteAllNursesSchedules(id);

    const deleteNurse = `
      DELETE FROM nurses WHERE id = $1;
    `;
    await this.databaseService.query(deleteNurse, [id]);

    return nurseExists

  }
}