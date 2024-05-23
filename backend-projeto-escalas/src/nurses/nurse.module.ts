import { Module, forwardRef } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [forwardRef(() => ScheduleModule)],
  controllers: [NurseController],
  providers: [NurseService, DatabaseService],
  exports: [NurseService]
})
export class NurseModule {}
