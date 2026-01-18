'use client';
import { iCompleteMerchantProduct } from '@/store/features/admin/merchant-product';
import { DropshipperProductAddToCart } from '@/store/features/dropshipper/product';
import { useSession } from 'next-auth/react';

interface SelectedVariant {
	id: number;
	qty: number;
	size: number;
	color: number;
	unit: number;
	variant_id: number;
}

export const ProductVariants = ({
	product,
}: {
	product: iCompleteMerchantProduct;
}) => {
	const { data: session } = useSession();
	return (
		<>
			{session?.tenant_type === 'dropshipper' && (
				<DropshipperProductAddToCart product={product} />
			)}
		</>
	);
};
