// prisma/mysql-tenant.service.ts
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MySQLTenantService implements OnModuleDestroy {
  private tenantClients: Map<string, PrismaClient> = new Map();
  private masterPrisma: PrismaClient;

  constructor(private configService: ConfigService) {
    this.masterPrisma = new PrismaClient();
  }

  async getTenantClient(tenantId: string): Promise<PrismaClient> {
    if (!this.tenantClients.has(tenantId)) {
      const tenant = await this.masterPrisma.tenant.findUnique({
        where: { id: tenantId },
      });

      if (!tenant) {
        throw new Error(`Tenant ${tenantId} not found`);
      }

      const databaseUrl = this.buildMySQLConnectionString(tenant.databaseName);

      const tenantPrisma = new PrismaClient({
        datasources: {
          db: { url: databaseUrl },
        },
      });

      await tenantPrisma.$connect();
      this.tenantClients.set(tenantId, tenantPrisma);
    }

    return this.tenantClients.get(tenantId);
  }

  private buildMySQLConnectionString(databaseName: string): string {
    const baseConfig = {
      user: this.configService.get('MYSQL_USER'),
      password: this.configService.get('MYSQL_PASSWORD'),
      host: this.configService.get('MYSQL_HOST'),
      port: this.configService.get('MYSQL_PORT'),
    };

    return `mysql://${baseConfig.user}:${baseConfig.password}@${baseConfig.host}:${baseConfig.port}/${databaseName}?connection_limit=5`;
  }

  async onModuleDestroy() {
    await Promise.all(
      Array.from(this.tenantClients.values()).map((client) =>
        client.$disconnect(),
      ),
    );
    await this.masterPrisma.$disconnect();
  }
}
