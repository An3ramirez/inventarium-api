import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class CatalogService {
  constructor(
    @InjectRepository(ProductEntity)
    private inventoryRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.inventoryRepository.find();
  }

  async findOne(id: number): Promise<ProductEntity> {
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const product: ProductEntity = this.inventoryRepository.create(createProductDto);
    return this.inventoryRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    await this.inventoryRepository.update(id, updateProductDto);
    return this.inventoryRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.inventoryRepository.delete(id);
  }
}
