import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ScheduleService {
  constructor(private databaseService: DatabaseService) {}

  
}