import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  IsEnum
} from 'class-validator';
import { Document } from 'mongoose';


//Listado de roles a utilizar (Observar la prop "Roles")
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SELLER = 'seller',
}


@Schema({ timestamps: true })
export class User extends Document {
  @IsOptional()
  @IsString()
  // Minimum length 3 and maximum length 50
  @Length(3, 50)
  @Prop({ required: true })
  username?: string;


  @IsEmail()
  @Transform(({ value }) => value.toLowerCase()) //Transforma el valor ingresado en minusculas (Lowercase)
  @Prop({ required: true })
  email: string;


  @IsNotEmpty()
  @IsString()
  // Minimum length 8 and maximum length 128
  @Length(8, 128)
  // Password must contain at least one uppercase letter, one lowercase letter and one number
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message: 'password too weak', //La contraseña es demasiado débil
  })
  @Prop({ required: true })
  password: string;


  @IsOptional()
  @IsEnum(UserRole) //Pasamos el listado de Roles disponibles, por medio de un ENUM
  @Prop({ type: String, enum: UserRole, default: UserRole.USER })
  role: UserRole;
  //El valor serà uno de los 3 listados en el Enum
}

export const UserSchema = SchemaFactory.createForClass(User);
