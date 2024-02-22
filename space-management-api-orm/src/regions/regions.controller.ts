
import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
  // , ParsedParams

import { RegionsService } from './regions.service';
import { Region } from './region.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@Crud(Region, {
  options: {
    join: {
     buildings: {
      },
    },
    sort: [{ field: 'id', order: 'ASC' }],
    maxLimit: 50,
    cache: 3000,
  },
})
@ApiUseTags('regions')
@Controller('regions')
export class RegionsController {
    constructor(public service: RegionsService) {}

    get base(): CrudController<RegionsService, Region> {
      return this;
    }
}
