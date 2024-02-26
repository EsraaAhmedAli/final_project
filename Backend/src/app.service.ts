/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(){}

  getHello(): string {
    return 'Hello World!';
  }
}
