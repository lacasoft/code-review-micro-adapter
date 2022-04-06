import {
  HealthCheckService,
  MemoryHealthIndicator,
  HealthCheckResult,
} from '@nestjs/terminus';
import { Injectable } from '@nestjs/common';
import { HealthCheckException } from '../exceptions/health.check.exception';

@Injectable()
export class HealthIndicator {
  constructor(
    private health: HealthCheckService,
    private memory: MemoryHealthIndicator,
  ) {}

  async isHealthy(): Promise<HealthCheckResult> {
    try {
      return await this.health.check([
        async () => this.memory.checkHeap('memory_heap', 200 * 1024 * 1024),
        async () => this.memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
      ]);
    } catch (error) {
      throw new HealthCheckException(error?.response);
    }
  }
}
