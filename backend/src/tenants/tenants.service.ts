// tenants/tenants.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { MySQLProvisioningService } from './provisioning/mysql-provisioning.service';
import { CreateTenantDto } from './dto/create-tenant.dto';

@Injectable()
export class TenantsService {
  private masterPrisma: PrismaClient;

  constructor(private mysqlProvisioning: MySQLProvisioningService) {
    this.masterPrisma = new PrismaClient();
  }

  async createTenant(createTenantDto: CreateTenantDto) {
    // 1. Create tenant record in master DB
    const tenant = await this.masterPrisma.tenant.create({
      data: {
        name: createTenantDto.name,
        subdomain: createTenantDto.subdomain,
        databaseName: `tenant_${createTenantDto.subdomain.toLowerCase()}`,
      },
    });

    try {
      // 2. Provision MySQL database
      const databaseUrl = await this.mysqlProvisioning.createTenantDatabase(
        tenant.id,
        tenant.subdomain,
      );

      // 3. Run migrations
      await this.mysqlProvisioning.runMigrations(databaseUrl);

      // 4. Update tenant with connection info
      return this.masterPrisma.tenant.update({
        where: { id: tenant.id },
        data: { isActive: true },
      });
    } catch (error) {
      // Cleanup if provisioning fails
      await this.masterPrisma.tenant.delete({ where: { id: tenant.id } });
      throw error;
    }
  }
}
