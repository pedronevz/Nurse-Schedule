import { IsNotEmpty, IsInt, IsDateString, IsString } from 'class-validator';

export class NurseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    // acrescentar o limitante de 6 char
    @IsNotEmpty()
    coren: string;
}