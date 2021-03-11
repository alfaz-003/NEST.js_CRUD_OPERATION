import { Controller, Post , Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor( private readonly productService  : ProductsService){}

    @Post()
   async addProduct(@Body('title') prodTitle: string ,
               @Body('description') prodDescription: string, 
               @Body('price') prodPrice: number)  {
       const generatedId= await this.productService.insertProduct(prodTitle, prodDescription, prodPrice);

       return {id:generatedId};
    }

    @Get()
    async showProducts(){
        const w = await this.productService.showProducts();  
        return w;
    }

    @Get(':id')
    showSingleProduct(@Param('id') prodId: string){
        return this.productService.showSingleProduct(prodId);
    }


    @Patch(':id')
   async updateProduct(@Param('id') prodId: string ,
                 @Body('title') prodTitle: string ,
                 @Body('description') prodDescription: string, 
                 @Body('price') prodPrice: number) 
    {
       await this.productService.updateProduct(prodId, prodTitle, prodDescription,prodPrice);
        return "Updated Successfully !!" ;
    }


    @Delete(':id')
   async deleteProduct(@Param('id') prodId: string) {
       await this.productService.deleteProduct(prodId);
        return "Product Deleted Successfully !!" ;
    }
}