import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getCourses() {
    return [
      {
        name: 'Micro-economics',
        rating: 8
      },
      {
        name: 'Macro-economics',
        rating: 7
      }
    ];
  }
}
