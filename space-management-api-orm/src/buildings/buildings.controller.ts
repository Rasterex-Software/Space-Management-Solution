
import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
  // , ParsedParams

import { BuildingsService } from './buildings.service';
import { Building } from './building.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@Crud(Building, {
  options: {
    join: {
      floors: {
      },
    },
    sort: [{ field: 'id', order: 'ASC' }],
    maxLimit: 50,
    cache: 3000,
  },
})
@ApiUseTags('buildings')
@Controller('buildings')
export class BuildingsController {
    constructor(public service: BuildingsService) {}

    get base(): CrudController<BuildingsService, Building> {
      return this;
    }

}
