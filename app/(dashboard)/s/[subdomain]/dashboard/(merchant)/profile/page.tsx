'use client';
import { VendorProfileSettings } from '@/store/features/vendor/profile';
import { MyShop } from '@/store/features/vendor/profile/my-shop';
import { MyShopDropshipper } from '@/store/features/vendor/profile/my-shop-dorpshipper';
import { VendorProfileNote } from '@/store/features/vendor/profile/vendor-note';
import { useSession } from 'next-auth/react';

import { useSearchParams } from 'next/navigation';

export default function User() {
	const { data: session } = useSession();
	const searchParams = useSearchParams().get('tab');
	const isDropshipper = session?.user?.tenant_type === 'dropshipper';
	switch (searchParams) {
		case 'note':
			return <VendorProfileNote />;

		case 'my_shop':
			return isDropshipper ? <MyShopDropshipper /> : <MyShop />;

		default:
			return <VendorProfileSettings />;
	}
}
