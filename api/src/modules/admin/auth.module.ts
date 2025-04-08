import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AdminModule } from './admin.module';
import { AuthController } from '../auth/auth.controller';

@Module({
  imports: [AdminModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
