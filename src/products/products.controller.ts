import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {

    constructor(private productsService: ProductsService​​) { }

    // you tell @Body what properties to look for on the response. Alternative way:
    // @Body('title') completeResponse: {title: string, description: string, price: number}
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') price: number,
    ): any {
        const generatedId = this.productsService.insertProduct(prodTitle, prodDesc, price);

        return { id: generatedId };
    }

    @Get()
    getAllProducts() {
        return this.productsService.fetchProducts();
    }


    @Get(':id')
    getProduct(@Param('id') prodId: string) {
        return this.productsService.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') price: number,
    ) {

    }


}
