
import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
  // , ParsedParams

import { FloorsService } from './floors.service';
import { Floor } from './floor.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@Crud(Floor, {
  options: {
    join: {
      areas: {
      },
    },
    sort: [{ field: 'id', order: 'ASC' }],
    maxLimit: 50,
    cache: 3000,
  },
})
@ApiUseTags('floors')
@Controller('floors')
export class FloorsController {
    constructor(public service: FloorsService) {}

    get base(): CrudController<FloorsService, Floor> {
      return this;
    }

    @Get('/with-building-region-country')
    public async getFloorsWithBuildingRegionCountry():Promise<Floor[]> {
      return this.service.getFloorsWithBuildingRegionCountry();
    }
}
