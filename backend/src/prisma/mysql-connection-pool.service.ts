// prisma/mysql-connection-pool.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Pool, createPool } from 'mysql2/promise';

@Injectable()
export class MySQLConnectionPoolService implements OnModuleDestroy {
  private pools: Map<string, Pool> = new Map();

  constructor(private configService: ConfigService) {}

  async getConnection(tenantId: string): Promise<any> {
    if (!this.pools.has(tenantId)) {
      const tenant = await this.getTenantInfo(tenantId);
      const pool = createPool({
        host: this.configService.get('MYSQL_HOST'),
        port: this.configService.get('MYSQL_PORT'),
        database: tenant.databaseName,
        user: this.configService.get('MYSQL_USER'),
        password: this.configService.get('MYSQL_PASSWORD'),
        connectionLimit: 10, // Adjust based on your needs
        waitForConnections: true,
      });
      this.pools.set(tenantId, pool);
    }
    return this.pools.get(tenantId).getConnection();
  }

  async onModuleDestroy() {
    await Promise.all(
      Array.from(this.pools.values()).map((pool) => pool.end()),
    );
  }

  private async getTenantInfo(tenantId: string) {
    // Implement tenant info retrieval
  }
}
