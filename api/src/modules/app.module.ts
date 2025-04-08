import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { ProductModule } from './products/product.module';
import { BlogModule } from './blogs/blog.module';
import { BackgroundModule } from './backgrounds/background.module';
import { JoseModule } from 'src/config/jose/jose.module';
import { BcryptModule } from 'src/config/bcrypt/bcrypt.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './admin/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule, // Global
    JoseModule, // Global
    BcryptModule, // Global
    HealthModule,
    ProductModule,
    BlogModule,
    BackgroundModule,
    AdminModule,
    AuthModule,
  ],
})
export class AppModule {}
