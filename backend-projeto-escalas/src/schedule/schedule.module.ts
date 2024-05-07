import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, DatabaseService],
})
export class ScheduleModule {}
