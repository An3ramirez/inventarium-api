import { Controller } from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('company')
@ApiTags('Empresas')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }


}
