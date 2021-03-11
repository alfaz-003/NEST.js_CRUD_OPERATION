import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {

    products :Product[] = [];    //initialy empty array

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>, ) {}

    async insertProduct(title: string,description: string,price: number){

        //const prodId =  (Math.floor(Math.random() * 10)).toString();

        const newProduct= new this.productModel({title: title, description: description, price: price});
        
      const result = await newProduct.save();
      console.log(result);
       return result.id; 

    }

    showProducts() {
       const r2 = this.productModel.find();
       console.log(r2);  
        return r2;
    }

  async showSingleProduct(pId : string) {
       const product = await this.findProduct(pId);
        return {id: product.id,title: product.title,description: product.description, price: product.price};
    }



   async updateProduct(pId : string,title: string,description: string,price: number) {
       
        const updatedProduct  =await this.findProduct(pId);

        if(title) {
            updatedProduct.title=title;
        }
        if(description) {
            updatedProduct.description=description;
        }
        if(price) {
            updatedProduct.price=price;
        }
       updatedProduct.save();
    }

    private async findProduct(id: string) : Promise<Product> {
   
        const product =  await this.productModel.findById(id);
        if(!product) {
           throw new NotFoundException('could not find the Product');
        }
          return product;
      }


     async deleteProduct(prodId: string){
       await this.productModel.deleteOne({_id: prodId});
      }
    

}