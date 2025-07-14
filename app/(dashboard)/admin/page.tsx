import { getAllSubdomains } from '@/lib/subdomains';
import type { Metadata } from 'next';
import { AdminDashboard } from './dashboard';
import { rootDomain } from '@/lib/utils';
import { Counter } from '@/store/features/counter';
import { TestQuery } from '@/store/features/test/TestQuery';

export const metadata: Metadata = {
  title: `Admin Dashboard | ${rootDomain}`,
  description: `Manage subdomains for ${rootDomain}`
};

export default async function AdminPage() {
  // TODO: You can add authentication here with your preferred auth provider
  const tenants = await getAllSubdomains();
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
  <TestQuery/>
      <Counter/>
      <AdminDashboard tenants={tenants} />
    </div>
  );
}
