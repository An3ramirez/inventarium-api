import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CompanyEntity } from './entities/company.entity';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyService } from './company.service';
import { Auth } from '@features/auth/decorators';
import { RoleEnum } from '@features/user/enums/role.enum';

@Controller('company')
@ApiTags('Empresas')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Auth(RoleEnum.ADMIN_USER, RoleEnum.EXTERNAL_USER)
  @ApiOperation({ summary: 'Obtiene todas las empresas' })
  @ApiOkResponse({ type: CompanyEntity, isArray: true })
  @Get()
  async findAll(): Promise<CompanyEntity[]> {
    return this.companyService.findAll();
  }

  @Auth(RoleEnum.ADMIN_USER, RoleEnum.EXTERNAL_USER)
  @ApiOperation({ summary: 'Obtiene una empresa específica por su NIT' })
  @ApiOkResponse({ type: CompanyEntity })
  @ApiNotFoundResponse()
  @Get(':nit')
  async findOne(@Param('nit') nit: number): Promise<CompanyEntity> {
    return this.companyService.findOne(nit);
  }

  @Auth(RoleEnum.ADMIN_USER)
  @ApiOperation({ summary: 'Crea una nueva empresa' })
  @ApiCreatedResponse({ type: CompanyEntity })
  @Post()
  async create(@Body() createEmpresaDto: CreateCompanyDto): Promise<CompanyEntity> {
    return this.companyService.create(createEmpresaDto);
  }

  @Auth(RoleEnum.ADMIN_USER)
  @ApiOperation({ summary: 'Actualiza una empresa existente por su NIT' })
  @ApiOkResponse({ type: CompanyEntity })
  @ApiNotFoundResponse()
  @Put(':nit')
  async update(
    @Param('nit') nit: number,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<CompanyEntity> {
    return this.companyService.update(nit, updateCompanyDto);
  }

  @Auth(RoleEnum.ADMIN_USER)
  @ApiOperation({ summary: 'Elimina una empresa existente por su NIT' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Delete(':nit')
  async delete(@Param('nit') nit: number): Promise<void> {
    return this.companyService.delete(nit);
  }
}
