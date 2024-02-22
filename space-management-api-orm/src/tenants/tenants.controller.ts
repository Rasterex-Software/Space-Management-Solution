
import { Controller, Get, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
  // , ParsedParams

import { TenantsService } from './tenants.service';
import { Tenant } from './tenant.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';

@Crud(Tenant, {
  options: {
    join: {
      areas:{},
      contracts: {
        // exclude: ['createdAt','updatedAt'],
        // allow: ['floorFile','surface']
      },
      "contracts.areas":{}
    },
    sort: [{ field: 'id', order: 'ASC' }],
    maxLimit: 50,
    cache: 3000,
  },
})
@ApiUseTags('tenants')
@Controller('tenants')
export class TenantsController {
    constructor(public service: TenantsService) {}

    get base(): CrudController<TenantsService, Tenant> {
      return this;
    }

    @Get('/floor/:floor')
    public async getTenantsByFloor( @Param('floor') floor:string):Promise<Tenant[]> {
      return this.service.getTenantsByFloor(floor);
    }

    @Get('/ids/floor/:floor')
    public async getTenantIdsByFloor( @Param('floor') floor:string):Promise<Number[]> {
      return this.service.getTenantIdsByFloor(floor);
    }

    @Get('/with-areas/floor/:floor')
    public async getTenantWithAreasByFloor( @Param('floor') floor:string):Promise<Tenant[]> {
      return this.service.getTenantsWithAreasByFloor(floor);
    }

}
