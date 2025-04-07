import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

@Controller('health')
export class HealthController {
  constructor() {}

  @ApiOperation({
    summary: 'Health check endpoint',
    description: 'Check if the API is running',
    tags: ['Health'],
  })
  @Get()
  getHealth() {
    return {
      status: 'ok',
      message: 'API is running',
    };
  }
}
