import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { AreasService } from './areas.service';
import { Area } from './area.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';


@Crud(Area, {
  params: {
    id: 'uuid'
  },
  options: {
    join:{
      tenant:{},
      contract:{},
      "contract.tenant":{}
    },
    // sort: [{ field: 'id', order: 'DESC' }],
    maxLimit: 100,
    cache: 3000,
  },
})
@ApiUseTags('areas')
@Controller('areas')
export class AreasController {
    constructor(public service: AreasService) {
    }

    get base():CrudController<AreasService, Area> {
      return this;
    }
}
