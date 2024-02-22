// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Region } from './region.entity';


// @Injectable()
export class RegionsService extends RepositoryService<Region> {
  protected options: RestfulOptions = {
    join:{
      buildings:{},
      "buildings.areas":{}
    }
  };

  constructor(@InjectRepository(Region) repo) {
    super(repo);
  }
}
