import { Global, Module } from '@nestjs/common';
import { JoseService } from './jose.service';

@Global()
@Module({ providers: [JoseService], exports: [JoseService] })
export class JoseModule {}
