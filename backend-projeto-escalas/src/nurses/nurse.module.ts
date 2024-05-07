import { Module } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { NurseService } from './nurse.service';
import { NurseController } from './nurse.controller';

@Module({
  controllers: [NurseController],
  providers: [NurseService, DatabaseService],
})
export class NurseModule {}
