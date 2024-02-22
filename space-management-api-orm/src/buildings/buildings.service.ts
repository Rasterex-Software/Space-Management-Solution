// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Building } from './building.entity';


// @Injectable()
export class BuildingsService extends RepositoryService<Building> {
  protected options: RestfulOptions = {
    join:{
      floors:{},
      "floors.areas":{}
    }
  };

  constructor(@InjectRepository(Building) repo) {
    super(repo);
  }

}
