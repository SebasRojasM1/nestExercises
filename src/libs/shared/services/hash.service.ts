import { Injectable } from '@nestjs/common';
import * as bcrypt from "bcrypt";

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt();
    return bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

/*
  1. Importamos la biblioteca bcrypt, que se utiliza para el hash y la comparación de contraseñas. 
  El Hash se usa para encriptar contraseñas u otros datos sensibles con un cifrado especial

  2. Creamos el servicio HashService, que contiene dos métodos: hash y compare.

  3. El método hash toma una cadena password como argumento y devuelve una promesa que resuelve en un hash de 
  la contraseña. Primero, se genera una "sal" o el número de rondas a utilizar con bcrypt.genSalt(). Luego, la 
  función bcrypt.hash() se utiliza para generar el hash de la contraseña utilizando la sal o las rondas 
  generadas. 
    (La "sal" es una cadena de datos aleatoria que se añade a la contraseña antes de realizar el hash. Esta técnica 
    se utiliza para aumentar la seguridad de los hashes de las contraseñas, ya que hace que cada contraseña hash 
    resultante sea única, incluso si dos usuarios tienen la misma contraseña)

  4. El método compare toma dos argumentos: una cadena password y un hash previamente generado. Retorna una promesa 
  que eventualmente resuelve en un booleano que indica si la contraseña coincide con el hash proporcionado. 
  La función bcrypt.compare() se utiliza para comparar la contraseña sin procesar con el hash almacenado y devolver 
  el resultado de la comparación.
*/