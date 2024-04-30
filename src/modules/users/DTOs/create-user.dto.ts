import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  role: string;
}


/*
Swagger (una herramienta que genera documentación automáticamente para tu API)

ApiProperty (De la library Swagger)
Se utiliza para documentar las propiedades de una clase o DTO (Data Transfer Object) cuando se genera la 
documentación de la API con Swagger en una aplicación NestJS. Te permite etiquetar cada parte de tu información 
para que Swagger pueda entenderla y mostrarla de manera ordenada en la documentación de tu API
*/