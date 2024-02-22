import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { ContractsService } from './contracts.service';
import { Contract } from './contract.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';


@Crud(Contract, {
  options: {
    join: {
      tenant: {
        exclude: ['contracts'],
      },
      areas:{}
    },
    maxLimit: 1000,
    cache: 3000,
  },
})
@ApiUseTags('contracts')
@Controller('contracts')
export class ContractsController {
    constructor(public service: ContractsService) {
    }

    get base():CrudController<ContractsService, Contract> {
      return this;
    }
}
