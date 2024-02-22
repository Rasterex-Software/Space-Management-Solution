// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Floor } from './floor.entity';


// @Injectable()
export class FloorsService extends RepositoryService<Floor> {
  protected options: RestfulOptions = {
    join:{
      areas:{},
      "areas.contracts":{}
    }
  };

  constructor(@InjectRepository(Floor) repo) {
    super(repo);
  }

  public async getFloorsWithBuildingRegionCountry():Promise<Floor[]> {
    return this.repo.createQueryBuilder("floor")
          .leftJoinAndSelect("floor.building","building")
          .leftJoinAndSelect("building.region","region")
          .leftJoinAndSelect("region.country","country")
          // .leftJoin("floor.building","building")
          // .leftJoin("building.region","region")
          // .leftJoin("region.country","country")
          // .addSelect("building.label AS buildingLabel")
          // .addSelect("region.label AS regionLabel")
          // .addSelect("country.label AS countryLabel")
          .select([
            "floor",
            "building.label",
            "region.label",
            "country.label",
          ])
          .getMany()
      ;
  }
}
