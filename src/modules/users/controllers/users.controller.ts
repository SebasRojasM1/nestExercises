import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from '../DTOs';
import { UserService } from '../services/users.service';

@ApiTags('users') /*Se utiliza para organizar y agrupar endpoints en la documentación de Swagger en una app NestJS. Etiqueta tus controladores con una o varios (tags) que luego se muestran en la interfaz de usuario de Swagger*/
@ApiBearerAuth() /*Se utiliza para documentar que los endpoints de tu API necesitan un token de autenticación tipo "Bearer" (Es decir,  tokens JWT (JSON Web Token) )*/
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
