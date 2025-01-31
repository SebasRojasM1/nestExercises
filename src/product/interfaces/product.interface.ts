/*Las interfaces se utilizan para definir la forma de los objetos y para establecer contratos o estructuras de datos.
 Se utiliza para definir la estructura de los documentos que se guardarán en la base de datos MongoDB.*/


//Ayuda a detallar que voy a estar manejando dentro del codigo, y no desde el servidor ni del cliente
import { Document } from "mongoose"

                        //Esto hace para que adquiera el formato de Mongo, ya que si no, lo toma como de TS y no funciona
export interface Product extends Document{ 
    readonly name: string,
    readonly description: string,
    readonly imageURL: string,
    readonly price: number,
    readonly createAt: Date
}

