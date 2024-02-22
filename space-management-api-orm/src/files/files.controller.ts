import { Controller, Delete, Param } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';

import { FilesService } from './files.service';
import { File } from './file.entity';

import {
  // ApiBearerAuth,
  // ApiOperation,
  // ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';


@Crud(File, {
  options: {
    // sort: [{ field: 'id', order: 'DESC' }],
    maxLimit: 100,
    cache: 3000,
  },
})
@ApiUseTags('files')
@Controller('files')
export class FilesController {
    constructor(public service: FilesService) {
    }

    get base():CrudController<FilesService, File> {
      return this;
    }

    @Delete('/:fileName')
    public async removeFileByName( @Param('fileName') fileName:string) {
      this.service.removeFileAndAreasByFileName(fileName);
    }

}
