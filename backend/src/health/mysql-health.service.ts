// health/mysql-health.service.ts
import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { MySQLTenantService } from '../prisma/mysql-tenant.service';

@Injectable()
export class MySQLHealthService extends HealthIndicator {
  constructor(private readonly mysqlTenantService: MySQLTenantService) {
    super();
  }

  async checkTenantDatabase(tenantId: string): Promise<HealthIndicatorResult> {
    try {
      const client = await this.mysqlTenantService.getTenantClient(tenantId);
      await client.$queryRaw`SELECT 1`;
      return this.getStatus('mysql-tenant', true);
    } catch (error) {
      throw new HealthCheckError(
        'MySQL Tenant database check failed',
        this.getStatus('mysql-tenant', false, { error: error.message }),
      );
    }
  }
}
