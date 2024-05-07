import { IsNotEmpty, IsInt, IsDateString, IsString } from 'class-validator';

export class ScheduleDto {
    @IsInt()
    @IsNotEmpty()
    nurseId: number;

    @IsDateString()
    @IsNotEmpty()
    day: string;

    @IsString()
    @IsNotEmpty()
    shift_type: string;
}