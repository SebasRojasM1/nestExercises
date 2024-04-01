import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose'; //Ayuda a importar un modelo para consultar cosas
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto'; //El DTO Ayuda a definir lo que voy a estar enviando y recibiendo desde la app
import { create } from 'domain';

@Injectable()
export class ProductService {//Product de Product.module
    constructor(@InjectModel("Product") private readonly productModel: Model<Product>){//Model<Product>. Se va a basar en el el tipo de dato de nuestra interfaz 
    } 


    //Creamos metodos:

    //Varios productos
    async getProducts(): Promise<Product[]>{
        const products = await this.productModel.find()
        return products;
    }

    //Uno solo producto
    async getProduct(productID: string): Promise<Product | null>{
        const product = await this.productModel.findById(productID)
        return product
    }

    async createProduct(createProductDTO:CreateProductDTO): Promise<Product>{
        const createProduct = new this.productModel(createProductDTO) //Es necesario colocar NEW, ya que se creara un nuevo objeto en base a la creación de los nuevos datos
        return await createProduct.save() //Se crea y guarda
    }

    async deleteProduct(productID: string): Promise<Product>{
        const deleteProduct = await this.productModel.findByIdAndDelete(productID)
        return deleteProduct
    }

    async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product>{
        const updateProduct = await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true}) //new:true es para que, cada vez que se actualice, aparezca el objeto nuevo, ya que sin ello aparecerá el objeto anterior a actualizarse.
        return updateProduct
    }
}
