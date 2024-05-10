import { IsNotEmpty, IsInt, IsObject } from 'class-validator';

export class ScheduleDto {
    @IsInt()
    @IsNotEmpty()
    nurseId: number;

    @IsInt()
    @IsNotEmpty()
    month: number;

    @IsInt()
    @IsNotEmpty()
    year: number;

    @IsObject()
    @IsNotEmpty()
    schedule: Record<string, string>;
}