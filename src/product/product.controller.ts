import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() productDTO: ProductDTO) {
    return this.productService.createProduct(productDTO);
  }

  @Get()
  async getAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    return this.productService.findProductById(id);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: number, @Body() updatedProduct: ProductDTO) {
    return this.productService.updateProduct(id, updatedProduct);
  }

  @Delete(':id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
  return this.productService.deleteProduct(id);
}

}

