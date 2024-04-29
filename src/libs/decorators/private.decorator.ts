import { SetMetadata } from '@nestjs/common';

export const Private = () => {
  return SetMetadata('IsPrivate', true);
};


/* 
1. Importamos la función SetMetadata de la biblioteca @nestjs/common. 
Esta función se utiliza para establecer metadatos personalizados en las clases, métodos o parámetros en NestJS.

2. Exportamos una función llamada Private. Esta función no toma ningún argumento, y devuelve el resultado de llamar a 
SetMetadata con dos argumentos: el nombre del metadato (en este caso, 'IsPrivate') 
y el valor true

3. Al aplicarlo, significa que el método aplicado será accesible solo de forma privada, ya que hemos marcado este método con 
el metadato 'IsPrivate' establecido en true.
*/