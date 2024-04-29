import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

/*
PartialType: Duplica y crea un nuevo tipo que tiene las mismas propiedades que otro tipo, pero todas las 
propiedades se hacen opcionales.

Es decir, en este caso, las propiedades de CreateUserDTO se duplicarán y tambien pasaran a ser parte de UpdateUserDTO,
por lo tanto tendrán la misma estructura.
*/