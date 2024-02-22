
import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { CountriesService } from './countries.service';
import { Country } from './country.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@Crud(Country, {
  options: {
    join: {
      regions: {
      },
    },
    sort: [{ field: 'id', order: 'ASC' }],
    maxLimit: 50,
    cache: 3000,
  },
})
@ApiUseTags('countries')
@Controller('countries')
export class CountriesController {
    constructor(public service: CountriesService) {}

    get base(): CrudController<CountriesService, Country> {
      return this;
    }

}
