import { Module } from '@nestjs/common';
import { ScheduleModule } from './schedule/schedule.module';
import { NurseModule } from './nurses/nurse.module';

@Module({
  imports: [ScheduleModule, NurseModule] 
})
export class AppModule {}
