import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ) {}

  create(createProductDto: CreateProductDto) {
    const { name, price, desc, qty, image } = createProductDto
    const newProduct: Product = {
      id: undefined,
      name,
      price,
      desc,
      qty,
      image,
      isActive: true,
      isDelete: false
    }
    return this.productRepository.save(newProduct);
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: {id} });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findOne({ where: {id} });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }
    product.name = updateProductDto.name;
    product.price = updateProductDto.price;
    product.desc = updateProductDto.desc;
    product.qty = updateProductDto.qty;
    product.image = updateProductDto.image;

    return this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: {id} });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`)
    }

    await this.productRepository.remove(product);
    
    return { message: 'Product deleted successfully' };
  }
}
