import { Controller, Get, Param, Query, Body, Post, Delete } from '@nestjs/common';
import { NurseService } from './nurse.service';


@Controller('nurse')
export class NurseController {
    constructor(private nurseService: NurseService) {}
        @Get()
        findAllNurses() {
            return this.nurseService.findAllNurses();
        }

        @Get('/:id')
        findNurse(@Param('id') id: number) {
            return this.nurseService.findNurse(id);
        }
    
        @Post('/')
        create(@Body() nurseDto) {
            return this.nurseService.create(nurseDto);
        }

        @Delete('/:id')
        deleteNurse(@Param('id') id: number): Promise<void> {
            return this.nurseService.deleteNurse(id);
        }
}
  