import { Body, Controller, Delete, Get, Param, Post, Put, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductEntity } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { CatalogService } from './catalog.service';
import { UpdateProductDto } from './dto/update-product.dto';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';
import { Auth } from '@features/auth/decorators';
import { RoleEnum } from '@features/user/enums/role.enum';

@Controller('product')
@ApiTags('Inventario')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) { }

  @Auth(RoleEnum.ADMIN_USER, RoleEnum.EXTERNAL_USER)
  @ApiOperation({ summary: 'Obtiene todos los productos' })
  @ApiOkResponse({ type: ProductEntity, isArray: true })
  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return this.catalogService.findAll();
  }

  @Auth(RoleEnum.ADMIN_USER, RoleEnum.EXTERNAL_USER)
  @ApiOperation({ summary: 'Descarga un PDF con la información de todos los productos' })
  @ApiOkResponse({ description: 'Descargar los productos como archivo PDF', content: { 'application/pdf': {} } })
  @Get('download')
  async downloadPdf(@Res() res: Response): Promise<void> {
    const products: ProductEntity[] = await this.catalogService.findAll();
    const pdf = new PDFDocument();

    pdf.text('Lista de Productos\n\n');

    products.forEach((product) => {
      pdf.text(`Nombre: ${product.name}`);
      pdf.text(`Cantidad: ${product.quantity}`);
      pdf.text(`Precio: ${product.price}`);
      pdf.text(`Descripción: ${product.description}`);
      pdf.text('\n');
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=productos.pdf');

    pdf.pipe(res);
    pdf.end();
  }

  @Auth(RoleEnum.ADMIN_USER, RoleEnum.EXTERNAL_USER)
  @ApiOperation({ summary: 'Obtiene un producto específico por su ID' })
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'El producto no fue encontrado' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    return this.catalogService.findOne(id);
  }

  @Auth(RoleEnum.ADMIN_USER)
  @ApiOperation({ summary: 'Crea un nuevo producto' })
  @ApiCreatedResponse({ type: ProductEntity })
  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.catalogService.create(createProductDto);
  }

  @Auth(RoleEnum.ADMIN_USER)
  @ApiOperation({ summary: 'Actualiza un producto existente por su ID' })
  @ApiOkResponse({ type: ProductEntity })
  @ApiNotFoundResponse({ description: 'El producto no fue encontrado' })
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.catalogService.update(id, updateProductDto);
  }

  @Auth(RoleEnum.ADMIN_USER)
  @ApiOperation({ summary: 'Elimina un producto existente por su ID' })
  @ApiOkResponse({ description: 'El producto fue eliminado exitosamente' })
  @ApiNotFoundResponse({ description: 'El producto no fue encontrado' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.catalogService.delete(id);
  }
}
