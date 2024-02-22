import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Floor } from './floor.entity';
import { FloorsController } from './floors.controller';
import { FloorsService } from './floors.service';

@Module({
  imports: [TypeOrmModule.forFeature([Floor])],
  controllers: [FloorsController],
  providers: [FloorsService],
  exports:[FloorsService]
})
export class FloorsModule {}
