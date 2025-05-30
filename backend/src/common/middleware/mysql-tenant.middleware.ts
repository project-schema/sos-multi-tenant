// common/middleware/mysql-tenant.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MySQLTenantService } from '../../prisma/mysql-tenant.service';

@Injectable()
export class MySQLTenantMiddleware implements NestMiddleware {
  constructor(private readonly mysqlTenantService: MySQLTenantService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const tenantId = this.extractTenantId(req);

    if (tenantId) {
      try {
        const tenantPrisma =
          await this.mysqlTenantService.getTenantClient(tenantId);
        req['tenantPrisma'] = tenantPrisma;
        req['tenantId'] = tenantId;
      } catch (error) {
        console.error('MySQL Tenant middleware error:', error);
      }
    }

    next();
  }

  private extractTenantId(req: Request): string | null {
    const pathParts = req.path.split('/');
    if (pathParts.length >= 3 && pathParts[1] === 'api') {
      return pathParts[2];
    }
    return null;
  }
}
