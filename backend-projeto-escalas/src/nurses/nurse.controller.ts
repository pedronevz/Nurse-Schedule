import { Controller, Get, Param, Query, Body, Post } from '@nestjs/common';
import { NurseService } from './nurse.service';


@Controller('nurse')
export class NurseController {
    constructor(private nurseService: NurseService) {}
        @Get('/:id')
        findNurse(@Param('id') id: number) {
            return this.nurseService.findNurse(id);
        }
    
        @Post('/')
        create(@Body() nurseDto) {
            return this.nurseService.create(nurseDto);
        }
}
  