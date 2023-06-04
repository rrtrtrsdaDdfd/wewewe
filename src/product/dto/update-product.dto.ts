import { PartialType } from '@nestjs/mapped-types';
import { ProductDTO } from './create-product.dto';

export class UpdateProductDto extends PartialType(ProductDTO) {}
