import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt'; //Se utilizan para extraer y verificar tokens JWT.
import { PassportStrategy } from '@nestjs/passport'; //Se utiliza para definir una estrategia de autenticación Passport en NestJS.
import { JwtPayload } from '../types'; //Es un tipo de datos que define la estructura de carga útil (payload) de un token JWT.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  //Este -JWTPayload- se importó (de tipo Type) de types/jwtPayload.type.ts
  validate(payload: JwtPayload): JwtPayload {
    return { sub: payload.sub };
  }
}


/*
1. Esta clase extiende PassportStrategy para definir una estrategia de autenticación Passport. 
  Se utiliza 'jwt' como nombre de la estrategia.


2. Contructor:
  2.1 jwtFromRequest: Se utiliza ExtractJwt.fromAuthHeaderAsBearerToken() para especificar que los tokens JWT se 
    extraerán del encabezado de autorización de tipo 'Bearer' (Es decir, tokens JWT (JSON Web Token) ) en las 
    solicitudes HTTP.
 
  2.2 ignoreExpiration: Se establece en false para que los tokens JWT expirados se rechacen, es decir, se cierre sesión.
  
  2.3 secretOrKey: Se especifica el SECRET utilizado para firmar y verificar los tokens JWT. En este caso, se 
    obtiene del entorno con process.env.JWT_SECRET. (Es decir, pasamos el TOKEN que contiene los multiples caractéres)


3. Validate
  Se llama cuando se valida un token JWT. En este caso, el método simplemente devuelve la carga útil (payload) del 
  token
  se utiliza para identificar al principal (usuario) al que se refiere el token.

  La reclamación "sub" contiene el identificador único del usuario al que pertenece el token. 
  Este identificador puede ser, por ejemplo, el ID de usuario en la base de datos.
*/