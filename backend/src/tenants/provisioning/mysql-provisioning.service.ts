// tenants/provisioning/mysql-provisioning.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createPool, Pool } from 'mysql2/promise';

@Injectable()
export class MySQLProvisioningService {
  private adminPool: Pool;

  constructor(private configService: ConfigService) {
    this.adminPool = createPool({
      host: this.configService.get('MYSQL_HOST'),
      port: this.configService.get('MYSQL_PORT'),
      user: this.configService.get('MYSQL_ADMIN_USER'),
      password: this.configService.get('MYSQL_ADMIN_PASSWORD'),
      multipleStatements: true,
    });
  }

  async createTenantDatabase(
    tenantId: string,
    subdomain: string,
  ): Promise<string> {
    const dbName = `tenant_${subdomain.toLowerCase()}`;

    try {
      // 1. Create database
      await this.adminPool.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);

      // 2. Create dedicated user with limited privileges
      const dbUser = `user_${subdomain.toLowerCase()}`;
      const dbPassword = this.generateRandomPassword();

      await this.adminPool.query(`
        CREATE USER IF NOT EXISTS '${dbUser}'@'%' IDENTIFIED BY '${dbPassword}';
        GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${dbUser}'@'%';
        FLUSH PRIVILEGES;
      `);

      // 3. Return connection string
      return `mysql://${dbUser}:${dbPassword}@${this.configService.get('MYSQL_HOST')}:${this.configService.get('MYSQL_PORT')}/${dbName}`;
    } catch (error) {
      // Cleanup if anything fails
      await this.cleanupFailedProvisioning(dbName);
      throw error;
    }
  }

  private async cleanupFailedProvisioning(dbName: string) {
    try {
      await this.adminPool.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    } catch (cleanupError) {
      console.error('Cleanup failed:', cleanupError);
    }
  }

  private generateRandomPassword(): string {
    return (
      Math.random().toString(36).slice(-10) +
      Math.random().toString(36).slice(-10)
    );
  }

  async runMigrations(databaseUrl: string) {
    // Using Prisma's migration engine programmatically
    const { Migrate } = require('@prisma/migrate');

    const migrate = new Migrate(databaseUrl);
    try {
      await migrate.up();
    } finally {
      await migrate.stop();
    }
  }
}
