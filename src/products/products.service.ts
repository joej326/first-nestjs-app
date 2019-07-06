import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductsService {
    private products: Product​​[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const prodId = Math.random().toString();
        const newProduct = new Product(prodId, title, desc, price);

        this.products.push(newProduct);

        return prodId;
    }

    fetchProducts() {
        return [...this.products];
    }

    getSingleProduct(prodId: string) {
        const product = this.findProduct(prodId)[0];

        return { ...product };
    }



    updateProduct(id: string, title: string, desc: string, price: number) {
        // modern javascipt that' a shortcut for this:
        // const product = this.findProduct(id)[0];
        // const index = this.findProduct(id)[1];
        
        const [product, indedx] = this.findProduct(id);

    }

    private findProduct(prodId): [Product, number] {
        const productIndex = this.products.findIndex(p => p.id === prodId);
        const product = this.products[productIndex];

        // nestjs supplies us with context-specific errors to be more specific than "Error()"
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return [product, productIndex];
    }
}
