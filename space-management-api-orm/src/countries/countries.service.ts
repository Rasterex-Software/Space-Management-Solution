// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Country } from './country.entity';


// @Injectable()
export class CountriesService extends RepositoryService<Country> {
  protected options: RestfulOptions = {
    join:{
      regions:{},
      "regions.buildings":{},
      "regions.buildings.floors":{},
      "regions.buildings.floors.areas":{}
    }
  };

  constructor(@InjectRepository(Country) repo) {
    super(repo);
  }

}
