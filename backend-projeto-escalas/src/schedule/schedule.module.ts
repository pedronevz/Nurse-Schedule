import { Module, forwardRef } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { NurseModule } from 'src/nurses/nurse.module';

@Module({
  imports: [forwardRef(() => NurseModule)],
  controllers: [ScheduleController],
  providers: [ScheduleService, DatabaseService],
  exports: [ScheduleService]
})
export class ScheduleModule {}
