/*DTO (Data Transfer Object) se utiliza para definir la estructura de los datos que 
se transfieren entre diferentes partes de la aplicación */

//Declaramos la estructura de la DB y su tipo de campo
export class CreateProductDTO {
    readonly name: string;
    readonly description: string;
    readonly imageURL: string;
    readonly price: number;
    readonly createAt: Date
}

//Importamos a product.controller