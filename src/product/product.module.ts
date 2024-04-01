import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';

import { ProductSquema } from './schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([ //Importamos nuestros squemas. Podemos hacer varios.
      {name: 'Product', schema: ProductSquema} //Los metodos los hacemos en product.service 
    ])
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
