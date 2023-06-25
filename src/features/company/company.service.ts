import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from './entities/company.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private companyRepository: Repository<CompanyEntity>,
  ) {}

  async findAll(): Promise<CompanyEntity[]> {
    return this.companyRepository.find();
  }

  async findOne(nit: number): Promise<CompanyEntity> {
    return this.companyRepository.findOne({ where: { nit } });
  }

  async create(createCompanyDto: CreateCompanyDto): Promise<CompanyEntity> {
    const company: CompanyEntity = this.companyRepository.create(createCompanyDto);
    return this.companyRepository.save(company);
  }

  async update(nit: number, updateCompanyDto: UpdateCompanyDto): Promise<CompanyEntity> {
    await this.companyRepository.update(nit, updateCompanyDto);
    return this.companyRepository.findOne({ where: { nit } });
  }

  async delete(nit: number): Promise<void> {
    await this.companyRepository.delete(nit);
  }
}
