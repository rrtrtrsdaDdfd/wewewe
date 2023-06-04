import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductDTO } from './dto/create-product.dto';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  

async createProduct(productDTO: ProductDTO): Promise<ProductDTO> {
  const product = new Product();
  product.name = productDTO.name;
  product.createdAT = new Date();
  product.updatedATA = new Date();

  const user = await this.userRepository.findOne({ where: { id: productDTO.userId } });
  product.user = user;

  const createdProduct = await this.productRepository.save(product);

  return {
    id: createdProduct.id,
    name: createdProduct.name,
    createdAt: createdProduct.createdAT,
    updatedAt: createdProduct.updatedATA,
    userId: createdProduct.user.id,
  };
}


 
  

  async findAllProducts(): Promise<ProductDTO[]> {
    const products = await this.productRepository.find();

    return products.map((product) => ({
      id: product.id,
      name: product.name,
      createdAt: product.createdAT,
      updatedAt: product.updatedATA,
      userId: product.user.id,
    }));
  }

  async findProductById(id: number): Promise<ProductDTO> {
    const product = await this.productRepository.findOne({ where: { id } });
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    return {
      id: product.id,
      name: product.name,
      createdAt: product.createdAT,
      updatedAt: product.updatedATA,
      userId: product.user.id,
    };
  }
  

  async updateProduct(id: number, updatedProduct: ProductDTO): Promise<ProductDTO> {
    const product = await this.productRepository.findOne({ where: { id } });
  
    if (!product) {
      throw new Error('Product not found');
    }
  
    product.name = updatedProduct.name;
    product.updatedATA = new Date();
  
    const user = await this.userRepository.findOne({ where: { id: updatedProduct.userId } });
    product.user = user;
  
    const updatedProductEntity = await this.productRepository.save(product);
  
    return {
      id: updatedProductEntity.id,
      name: updatedProductEntity.name,
      createdAt: updatedProductEntity.createdAT,
      updatedAt: updatedProductEntity.updatedATA,
      userId: updatedProductEntity.user.id,
    };
  }
  

  async deleteProduct(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
  
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    await this.productRepository.remove(product);
  }
  
  
}





