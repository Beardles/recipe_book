import * as path from 'path';
import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get('!*/graphql')
  catchall(@Res() res: Response): void {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  }
}
