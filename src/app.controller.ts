import { HealthCheckExceptionFilter } from './filters/health-check-exception.filter';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { Controller, Get, UseFilters } from '@nestjs/common';
import { HealthIndicator } from './health/health';

@Controller('cashback/mambu')
export class AppController {
  constructor(private healthIndicator: HealthIndicator) {}

  @Get('health')
  @HealthCheck()
  @UseFilters(HealthCheckExceptionFilter)
  async isHealthHTTP(): Promise<HealthCheckResult> {
    return await this.healthIndicator.isHealthy();
  }
}
