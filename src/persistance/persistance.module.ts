import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
//ConfigType asegura que la configuración que le pasemos coincida con el tipo esperado (Es decir, aqui le pasamos la configuración (dbConfig) que creamos).

import { MongooseModule } from '@nestjs/mongoose';
import dbConfig from './db-config';
//dbConfig: configuración que creamos para acceder a la base de datos


/*OBJETIVO DEL ESTE MODULE:
se encarga de la configuración y la inicialización de la conexión a la base de datos utilizando Mongoose */


//@Global: Marca el módulo como global. El modulo estará disponible de forma global en toda la aplicación
@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof dbConfig>) => { //Le pasamos la configuracion a ConfigType (mirar descripcion arriba) y retorna una funcion para establecer la conexion a la DB
        const { db, env } = configService; //Destructura los elementos de dbConfig: DB y ENV
        
        //Contruimos la conexion a MongoDB
        const uriDb =
          env === 'local' //Verifica que si el entorno es local. Si es asi, se ejecutará una conexion LOCAL
            ? `${db.connection}${db.host}/${db.name}`
            : `mongodb+srv://${db.user}:${db.password}@cluster0.lhj2or0.mongodb.net/`;
            //Si no, se ejecutará esta opcion, que es para usar la base de datos ATLAS: 

            //(El uso de "?" y ":" se llama Operaciones Ternarias, es lo mismo que "IF-ELSE" resumido en una sola linea de codigo)
        return {
          uri: uriDb, //Retorna la configuracion de la DB con la URI de la conexion
        };
      },
      inject: [dbConfig.KEY],
      /*se le indica a Nest que debe inyectar el servicio dbConfig como una dependencia dentro de la función de fábrica utilizada para configurar la conexión a la base de datos.
        Entonces, cuando se llama a la función de fábrica, Nest automáticamente proporciona el servicio dbConfig como un parámetro, permitiendo que la función acceda a la configuración de la base de datos.*/
    }),
  ],
})

export class PersistanceModule {}
