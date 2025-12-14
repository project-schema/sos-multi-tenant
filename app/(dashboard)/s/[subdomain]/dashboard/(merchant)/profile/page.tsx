'use client';
import { VendorProfileSettings } from '@/store/features/vendor/profile';
import { MyShop } from '@/store/features/vendor/profile/my-shop';
import { VendorProfileNote } from '@/store/features/vendor/profile/vendor-note';
import { useSearchParams } from 'next/navigation';

export default function User() {
	const searchParams = useSearchParams().get('tab');
	switch (searchParams) {
		case 'note':
			return <VendorProfileNote />;

		case 'my_shop':
			return <MyShop />;

		default:
			return <VendorProfileSettings />;
	}
}
