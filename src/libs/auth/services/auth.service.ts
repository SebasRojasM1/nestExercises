import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from '../../utils/services/hash.service';
import { SignUpDto, UserLoginDto } from '../DTOs/index';
import { JwtPayload, Tokens } from '../types';
import { UserService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  constructor( //se inyectan los servicios necesarios para la autenticación de usuarios
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly hashService: HashService,
  ) {}

  

  async logIn(userLogInDto: UserLoginDto) {
    //Verifica que el email ingresado (Usuario) exista...
    const user = await this.userService.findOneByEmailRegister(userLogInDto.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    //Compara la contraseña ingresada, con la contraseña encriptada (Hash) del usuario, y si coinciden, continua...
    const isPasswordValid = await this.hashService.compare(
      userLogInDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException('Incorrect password');
    }

    return await this.getTokens({
      sub: user.id,
    });
    /*si la verificación de la contraseña es exitosa, se llama al método getTokens (Se creó mas abajo. Mirar) para 
      generar y devolver los tokens de acceso para el usuario autenticado. El método getTokens generalmente contiene
      la carga útil (payload) del token, que contiene el identificador unico del usuario (id). */
  }




  async register(userRegister: SignUpDto): Promise<Tokens> {
    /*validateEmailForSignUp es un metodo creado (Se creó mas abajo. Mirar) La cual tiene como objetivo verificar 
      si el Email ingresado ya está en uso*/
    await this.validateEmailForSignUp(userRegister.email);


    /*Utiliza el servicio hashService (Del contructor) para almacenar de forma segura (encriptada) la contraseña.
      Este servicio hace el llamado de Hash.services.ts del folder "Shared", donde se implementó la logica para 
      encriptar contraseñas*/
    const hashedPassword = await this.hashService.hash(userRegister.password);


    //Se crea el usuario con email, user y password(Ya encriptado/hashed)
    const user = await this.userService.create({
      email: userRegister.email,
      userName: userRegister.userName,
      password: hashedPassword,
      role: userRegister.role,
    });


    return await this.getTokens({
      sub: user.id,
    });
    /*si la verificación de la contraseña es exitosa, se llama al método getTokens (Se creó mas abajo. Mirar) para 
      generar y devolver los tokens de acceso para el usuario autenticado. El método getTokens generalmente contiene
      la carga útil (payload) del token, que contiene el identificador unico del usuario (id). */
  }




  async getTokens(jwtPayload: JwtPayload): Promise<Tokens> {

    /*Obtenemos la KEY o TOKEN que almacenamos en el .env. */
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) { //Si no existe la variable SECRET_KEY o no tiene valor...
      throw new Error('SECRET_KEY is not set');
    }

    /*Implementamos el tiempo de caducidad (con el metodo expiresIn) de nuestro token, almacenado en el archivo .env*/
    const accessTokenOptions = {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    };

    /*Firmamos el Token, con el Key, tiempo de caducidad y la configuración del token de tipo Number*/
    const accessToken = await this.signToken(
      jwtPayload,
      secretKey,
      accessTokenOptions,
    );

    //Devuelve un objeto que contiene toda esta info.
    return { access_token: accessToken };
  }





  /*Este método funciona para firmar un token JWT con el payload (payload), la clave (secretKey) y 
   opciones adicionales (options). El método devuelve una promesa que devuelve el token JWT firmado. 
   
   Options: Son opciones adicionales para configurar el token JWT, como la duración (expiresIn), 
   algoritmo de firma, etc.*/
  async signToken(payload: JwtPayload, secretKey: string, options: any) {
    return await this.jwtService.signAsync(payload, {
      secret: secretKey,
      ...options, //Impementamos "Options" para darle la posibilidad de configurarlo posteriormente
                  //O en resumen, reserva parte de memoria para esto.
    });
  }


  //Metodo para verificar si el Email ingresado ya existe (Devuelve un booleano True o False)
  async validateEmailForSignUp(email: string): Promise<boolean | undefined> {
    const user = await this.userService.findOneByEmailRegister(email);

    if (user) {
      throw new HttpException('Email already exists!', 400);
    }
    return true;
  }
}