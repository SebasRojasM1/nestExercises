import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';

import { ProductService } from './product.service';

//ESPECIFICAMOS LAS RUTAS QUE TENDRA, ES DECIR, GET, POST, ... 
@Controller('product')
export class ProductController {

    constructor(private productService: ProductService){}   //Llamamos los metodos con un CONSTRUCTOR


    @Post("/create") //Localhost:4000/product/create
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO){ //@Body() createProductDTO: Quiere decir que se está transfiriendo desde la app de cliente al servidor
        console.log(createProductDTO)
        const product = await this.productService.createProduct(createProductDTO) //Hace la consulta

        return res.status(HttpStatus.OK).json({
            message: "Product successfully created",
            product: product //Enviale el producto enviado/creado
        })
    }
    /*@Res() se usa para inyectar el objeto de respuesta HTTP en el método.
     Esto te permite manipular directamente la respuesta que será enviada al cliente desde tu controlador.*/

    @Get("/")
    async getProducts(@Res() res){
        const products = await this.productService.getProducts()
        
        return res.status(HttpStatus.OK).json({
            message: "Products:",
            products: products //Enviale el producto enviado/creado
        })
    }


    @Get("/:productID")
    async getProduct(@Res() res, @Param("productID") productID){
        const product = await this.productService.getProduct(productID)
    //ESTO LO QUE HACE ES RECIBIR CREAR LOS DATOS Y HACERLOS EN UN JSON, CON UN BODY DE NUESTRO DB
        
        if(!product) throw new NotFoundException("The product does not exist")

        return res.status(HttpStatus.OK).json(product)
    }


    @Delete("/delete/:productID")
    async deleteProduct(@Res() res, @Param("productID") productID){
        const product = await this.productService.deleteProduct(productID)

        if(!product) throw new NotFoundException("The product does not exist")
    
        return res.status(HttpStatus.OK).json({
            message: "Product successfully deleted",
            product: product
        })
    }   


    @Put("/update/:productID")
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Param("productID") productID){
        const updateProduct = await this.productService.updateProduct(productID, createProductDTO)
    
        if(!updateProduct) throw new NotFoundException("The product does not exist")
    
        return res.status(HttpStatus.OK).json({
            message: "Product updated successfully ",
            updateProduct: updateProduct
        })
    }
}