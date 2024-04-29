import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from '../DTOs/user-signUp.dto';
import { UserLoginDto } from '../DTOs/user-login.dto';
import { AtGuard } from '../guards/auth.guard';
import { Public } from 'src/libs/decorators';
import { AuthService } from '../services/auth.service';



@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  //Realizamos operaciones del AuthService (Es decir, del archivo Service) 
  constructor(private readonly authService: AuthService) {}


  @Public() //Acceso publico
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  /*Se crea en base al DTO de registro, incluyendo el metodo signUp, donde de hace el Hash (encriptado) 
    de la contraseña para el usuario creado*/
  async register(@Body() signUpDto: SignUpDto) {
    const token = await this.authService.signUp(signUpDto);

    /*Devuelve un objeto, donde tiene las "reglas" del encriptado, entre ellas, que la contraseña es un string */
    return { access_token: token.access_token };
  }





  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  /*Verifica el email con el email ingresado, y adicional, con el metodo "logIn" compara la contraseña ingresada
    con la contraseña encriptada (Hash)*/
  async login(@Body() userLogInDto: UserLoginDto) {
    const token = await this.authService.logIn(userLogInDto);

    return { access_token: token.access_token };
  }


  /*El guardian se efectuará en aquellos endpoins que terminen en "Check" */
  @Post('check')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async check() {
    return true;
  }
}
