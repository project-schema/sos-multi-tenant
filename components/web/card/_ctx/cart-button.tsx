import { iVendorProduct } from '@/store/features/vendor/product/vendor-product-type';
import { ShoppingCart } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export function CartButton({ product }: { product: iVendorProduct }) {
	const { status } = useSession();
	const router = useRouter();
	const isAuthenticated = status === 'authenticated';

	// Handle Add to Cart
	const handleAddToCart = async () => {
		if (!isAuthenticated) {
			toast.info('Please login to add items to your cart');
			router.push('/auth?tab=login');
			return;
		}

		try {
			const cartData: iAddToCartRequest = {
				product_id: product.id,
				purchase_type: 'single',
				tenant_id: 'borax',
				qty: [quantity],
				size_id: [selectedSize],
				color_id: [selectedColor],
				unit_id: [product.unit_id],
				frontend_purchase: 'yes',
				cartItems: [
					{
						qty: quantity,
						color: selectedColor,
						size: selectedSize,
						variant_id: selectedVariantId,
						unit: product.unit_id,
					},
				],
			};

			const result = await addToCart(cartData).unwrap();

			if (result.status === 201) {
				toast.success(result.message || 'Added to cart');
			} else if (result.status === 409) {
				toast.info(result.message || 'Product already in cart');
			} else {
				toast.error(result.message || 'Failed to add to cart');
			}
		} catch (error: any) {
			toast.error(error?.data?.message || 'Something went wrong');
		}
	};

	// Handle Buy Now
	const handleBuyNow = async () => {
		if (!isAuthenticated) {
			toast.info('Please login to continue');
			router.push('/auth?tab=login');
			return;
		}
	};
	return (
		<button className="w-8 h-8 rounded-sm border-1 border-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors duration-200 flex items-center justify-center group/btn">
			<ShoppingCart className="w-5 h-5 text-orange-500 group-hover/btn:scale-110 transition-transform duration-200" />
		</button>
	);
}
