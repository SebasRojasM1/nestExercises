import { IsString, IsDate, IsInt, Min } from 'class-validator';

export class CreateEventDto {
    @IsString()
    name: string;
    
    @IsDate()
    date: Date;
    
    @IsString()
    location: string;
    
    @IsInt()
    @Min(0)
    capacity: number;  
}
