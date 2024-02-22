// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Area } from './area.entity';

// @Injectable()
export class AreasService extends RepositoryService<Area> {
  protected options: RestfulOptions = {
    join:{
      tenant:{},
      contract:{}
    }
  };

  constructor(@InjectRepository(Area) repo) {
    super(repo);
  }
}
