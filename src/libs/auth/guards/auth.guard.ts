import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; //se utiliza para leer metadatos de los decoradores, es decir, decoradores personalizados
import { AuthGuard } from '@nestjs/passport'; //implementar guardias de autenticación
import { Logger } from '@nestjs/common'; //se utiliza para registrar información de registro.


/*Se utilizará la estrategia de autenticación 'jwt', de "Passport*/
@Injectable()
export class AtGuard extends AuthGuard('jwt') {

  /* Se crea una nueva instancia de Logger utilizando el nombre de la clase AtGuard*/
  private readonly logger = new Logger(AtGuard.name);

  /*El constructor recibe una instancia de Reflector, que se utiliza para leer metadatos de los decoradores. 
    es decir, decoradores personalizados*/
  constructor(private reflector: Reflector) {
    super();
  }

  // Determina si la ruta puede ser accedida sin autenticación
  //Context proporciona información sobre la solicitud HTTP y la ruta que se está accediendo.
  canActivate(context: ExecutionContext) {

    /*reflector.getAllAndOverride: Utiliza el Reflector para obtener metadatos de los decoradores personalizados 
    aplicados al controlador y/o al método de la ruta. (Es decir, localiza el decorador que utilizamos, llamado "isPublic")*/
    const isPublic = this.reflector.getAllAndOverride('isPublic', [

      /*Especifica los lugares donde se buscará el metadato. En este caso, se busca primero en el método de la ruta 
      (context.getHandler()) y luego en la clase controladora context.getClass()). */
      context.getHandler(), //Rutas
      context.getClass(),   //Clase controladora
    ]);

    /*Si se encuentra el metadato isPublic y su valor es true, indica que la ruta es pública y no requiere 
    autenticación. Devuelve true, lo que significa que puede continuar sin autenticación. */
    if (isPublic) return true;

    return super.canActivate(context);
  }



  // Handles the request after JWT authentication
  /*verifica si hay errores (err) o información (info) después de la autenticación JWT. Si no, ejecutese... */
  handleRequest(err, user, info: Error) {
    if (err || info) {
      this.logger.error(`JWT error: ${info.message || err}`); //Si hay un error, se ejecuta esto.
      throw new HttpException(
        'Token is expired!',  
        HttpStatus.EXPECTATION_FAILED,  //Se lanza un mensaje que indica que el token expiró
      );
    }


    /*Si no se proporciona un usuario después de la autenticación JWT (o si el usuario no es válido), se registra 
      un mensaje de advertencia en el registro utilizando el Logger de NestJS.
      Se lanza una excepción UnauthorizedException con un mensaje indicando que el acceso está denegado. */
    if (!user) {
      this.logger.warn('Access Denied: Unauthorized access attempt');
      throw new UnauthorizedException('Access Denied.');
    }

    return user;
  }
}
