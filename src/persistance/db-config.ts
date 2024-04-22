/*OBJETIVO:
Se definirá  una configuracion para establecer la conexion a MONGODB*/

//registerAs (del paquete @nestjs/config) ayuda a registrar una configuracion que crearemos
import { registerAs } from "@nestjs/config";


//Registramos la configuracion con el nombre "dbConfig"
export default registerAs("dbConfig", () => {
    const dbConfig = {
        db: { //Definimos cada uno de los detalles que contendrá la conexion (URL/LINK) a la base de datos 
              //(En la URL, sustituiremos valores con ${,,,} con cada uno de estos elementos que creamos a continuacion:)
              //Mirar archivo: persistance.module.ts

            connection: process.env.DB_CONNECTION,
            host: process.env.DB_HOST,
            name: process.env.DB_NAME,  /*ENV: variables de entorno */
            user: process.env.DB_USER,  //archivo .env
            password: process.env.DB_PASSWORD
        },
        env: process.env.NODE_ENV || "local"
    };
    return dbConfig
})


/*Este archivo proporciona un mecanismo para definir y exportar la configuración de la base 
de datos MongoDB en una aplicación Nest.js, permitiendo que esta configuración se reutilice 
en otros módulos de la aplicación donde se necesite establecer la conexión a la base de datos. */