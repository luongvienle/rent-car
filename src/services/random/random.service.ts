import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomService {
  generateRandomNumber(): string {
    const random = Math.floor(100000 + Math.random() * 900000).toString();
    return random;
  }
}
