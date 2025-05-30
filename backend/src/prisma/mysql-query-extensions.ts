// prisma/mysql-query-extensions.ts
import { PrismaClient } from '@prisma/client';

export function withMySQLExtensions(client: PrismaClient) {
  return client.$extends({
    query: {
      async $allOperations({ operation, model, args, query }) {
        // MySQL-specific optimizations
        if (operation === 'findMany' && args?.take > 1000) {
          console.warn('Large result set requested from MySQL');
        }
        
        // Add FOR UPDATE for critical transactions
        if (operation === 'findUnique' && args?.forUpdate) {
          const result = await query(args);
          await client.$executeRaw`SELECT 1 FROM ${model} WHERE id = ${result.id} FOR UPDATE`;
          return result;
        }

        return query(args);
      },
    },
    model: {
      $allModels: {
        async fullTextSearch<T>(this: T, query: string) {
          const context = Prisma.getExtensionContext(this);
          // MySQL FULLTEXT search implementation
          return context.$queryRaw`
            SELECT * FROM ${context.$name} 
            WHERE MATCH(column) AGAINST(${query} IN NATURAL LANGUAGE MODE)
          `;
        },
      },
    },
  });
}