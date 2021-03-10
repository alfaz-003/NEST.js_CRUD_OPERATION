import { Controller, Post , Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor( private readonly productService  : ProductsService){}

    @Post()
    addProduct(@Body('title') prodTitle: string ,
               @Body('description') prodDescription: string, 
               @Body('price') prodPrice: number) : any {
       const generatedId= this.productService.insertProduct(prodTitle, prodDescription, prodPrice);

       return {id:generatedId};
    }

    @Get()
    showProducts(){
        return this.productService.showProducts();  
    }

    @Get(':id')
    showSingleProduct(@Param('id') prodId: string){
        return this.productService.showSingleProduct(prodId);
    }


    @Patch(':id')
    updateProduct(@Param('id') prodId: string ,
                 @Body('title') prodTitle: string ,
                 @Body('description') prodDescription: string, 
                 @Body('price') prodPrice: number) 
    {
        this.productService.updateProduct(prodId, prodTitle, prodDescription,prodPrice);
        return "Updated Successfully !!" ;
    }


    @Delete(':id')
    deleteProduct(@Param('id') prodId: string) {
        this.productService.deleteProduct(prodId);
        return "Product Deleted Successfully !!" ;
    }
}