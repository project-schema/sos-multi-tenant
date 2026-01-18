import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export function CartButton({ product }: { product: iVendorProduct }) {
	const { status } = useSession();
	const router = useRouter();
	const isAuthenticated = status === 'authenticated';

	return (
		<button className="w-8 h-8 rounded-sm border-1 border-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center group/btn">
			<ShoppingCart className="w-5 h-5 text-orange-500 group-hover/btn:scale-110 transition-transform duration-200" />
		</button>
	);
}
