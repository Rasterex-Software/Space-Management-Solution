// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Tenant } from './tenant.entity';


// @Injectable()
export class TenantsService extends RepositoryService<Tenant> {
  protected options: RestfulOptions = {
    join:{
      areas: {},
      contracts:{},
      "contracts.areas":{}
    }
  };

  constructor(@InjectRepository(Tenant) repo) {
    super(repo);
  }

  public getTenantsByFloor(floor:string):Promise<Tenant[]> {
     return this.repo.createQueryBuilder("tenant")
                    .leftJoin("tenant.contracts","contract")
                    .leftJoin("contract.areas","area")
                    .where("area.floorFile = :floor",{ floor: floor})
                    .getMany()
                ;

  }

  public async getTenantIdsByFloor(floor:string):Promise<Number[]> {
    let tenantIds:Number[] = [];

    const tenants = await this.repo.createQueryBuilder("tenant")
                  .select(["tenant.id"])
                  .leftJoin("tenant.contracts","contract")
                  .leftJoin("contract.areas","area")
                  .where("area.floorFile = :floor",{ floor: floor})
                  .getMany()
                ;

    tenants.forEach((tenant)=>{
      tenantIds.push(tenant.id)
    });

    return tenantIds;
  }

  public async getTenantsWithAreasByFloor(floor:string):Promise<Tenant[]> {
    return this.repo.createQueryBuilder("tenant")
          .leftJoin("tenant.contracts","contract")
          .leftJoinAndSelect("contract.areas","area")
          .where("area.floorFile = :floor",{ floor: floor})
          .getMany()
      ;
  }
}
