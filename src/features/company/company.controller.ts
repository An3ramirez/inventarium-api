import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from './entities/company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';

@Controller('company')
@ApiTags('Empresas')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  @Get()
  async findAll(): Promise<CompanyEntity[]> {
    return this.companyService.findAll();
  }

  @ApiOkResponse({ type: CompanyEntity })
  @ApiNotFoundResponse()
  @Get(':nit')
  async findOne(@Param('nit') nit: number): Promise<CompanyEntity> {
    return this.companyService.findOne(nit);
  }

  @ApiCreatedResponse({ type: CompanyEntity })
  @Post()
  async create(@Body() createEmpresaDto: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companyService.create(createEmpresaDto);
  }

  @ApiOkResponse({ type: CompanyEntity })
  @ApiNotFoundResponse()
  @Put(':nit')
  async update(
    @Param('nit') nit: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    return this.companyService.update(nit, updateCompanyDto);
  }

  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':nit')
  async delete(@Param('nit') nit: number): Promise<void> {
    return this.companyService.delete(nit);
  }
}
