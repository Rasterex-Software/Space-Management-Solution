// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { Contract } from './contract.entity';

// @Injectable()
export class ContractsService extends RepositoryService<Contract> {
  protected options: RestfulOptions = {
    join: {
      tenant: {},
      areas:{},
    }
  };

  constructor(@InjectRepository(Contract) repo) {
    super(repo);
  }
}
