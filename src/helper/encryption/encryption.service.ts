import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EncryptionService {
  constructor(private config: ConfigService) {}
  async hashing(str: string): Promise<string> {
    const hash = await bcrypt.hash(
      str,
      bcrypt.genSaltSync(Number(this.config.get<string>('HASH_ROUND'))),
    );
    return hash;
  }
  async compareDataToHash(data: string, encrypted: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(data, encrypted);
    return isMatch;
  }
}
