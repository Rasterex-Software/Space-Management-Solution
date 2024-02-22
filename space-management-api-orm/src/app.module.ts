import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfig } from './orm.config';
import { AreasModule } from './areas/areas.module';
import { ContractsModule } from './contracts/contracts.module';

import { TenantsModule } from './tenants/tenants.module';
import { CountriesModule } from 'countries/countries.module';
import { RegionsModule } from 'regions/regions.module';
import { BuildingsModule } from 'buildings/buildings.module';
import { FloorsModule } from 'floors/floors.module';
import { FilesModule } from 'files/files.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AreasModule,
    BuildingsModule,
    ContractsModule,
    CountriesModule,
    FloorsModule,
    RegionsModule,
    TenantsModule,
    FilesModule
  ]
})
export class AppModule {}
