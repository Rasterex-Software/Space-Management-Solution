// import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryService } from '@nestjsx/crud/typeorm';
import { RestfulOptions } from '@nestjsx/crud';
import { File } from './file.entity';
import { Area } from 'areas/area.entity';

// @Injectable()
export class FilesService extends RepositoryService<File> {
  protected options: RestfulOptions = {
  };

  constructor(@InjectRepository(File) repo) {
    super(repo);
  }

  public async removeFileAndAreasByFileName(fileName:string) { // :Promise<any> {
    await this.repo.createQueryBuilder()
          .delete()
          .from(File)
          .where('name = :fileName', {fileName: fileName})
          .execute()
      ;
    await this.repo.createQueryBuilder()
      .delete()
      .from(Area)
      .where('floorFile = :fileName', {fileName: fileName})
      .execute()
      ;

  }
}
