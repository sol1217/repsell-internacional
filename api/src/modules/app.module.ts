import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/config/prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { ProductModule } from './products/product.module';
import { BlogModule } from './blogs/blog.module';
import { BackgroundModule } from './backgrounds/background.module';

@Module({
  imports: [
    PrismaModule, // Global
    HealthModule,
    ProductModule,
    BlogModule,
    BackgroundModule,
  ],
})
export class AppModule {}
