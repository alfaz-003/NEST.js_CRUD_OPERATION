import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {

    products :Product[] = [];    //initialy empty array

    insertProduct(title: string,description: string,price: number){

        const prodId =  (Math.floor(Math.random() * 10)).toString();
        const newProduct= new Product(prodId,title,description,price);
        this.products.push(newProduct);

        return prodId; 

    }

    showProducts() {
        return this.products;
    }

    showSingleProduct(pId : string) {
       const product =this.findProduct(pId)[0];
        return product;
    }

    updateProduct(pId : string,title: string,description: string,price: number) {
        const product =this.findProduct(pId)[0];
        const index =this.findProduct(pId)[1];

        const updatedProduct ={...product};

        if(title) {
            updatedProduct.title=title;
        }
        if(description) {
            updatedProduct.description=description;
        }
        if(price) {
            updatedProduct.price=price;
        }
        this.products[index] = updatedProduct;
    }

    private findProduct(id: string) : [Product,number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if(!product) {
           throw new NotFoundException('could not find the Product');
        }
          return [product,productIndex];
      }


      deleteProduct(pId: string){
        const [product,index] = this.findProduct(pId);
        this.products.splice(index,1); 
      }
    

}