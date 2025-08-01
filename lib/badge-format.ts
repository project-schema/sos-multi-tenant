import { badgeVariants } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';

type BadgeVariant = VariantProps<typeof badgeVariants>;
type Badge = BadgeVariant['variant'];

export const badgeFormat = (status: string | number): Badge => {
	switch (status) {
		case 'User':
		case 'ready':
			return 'secondary';

		case 'Drop Shipper':
		case 'Direct':
		case 'hold':
			return 'outline';

		case 'active':
		case 'processing':
		case 'delivered':
		case 1:
			return 'success';

		case 'pending':
		case 'Merchant':
		case 'Merchant':
		case 'progress':
		case 2:
			return 'warning';

		case 'Admin':
		case 'Woocommerce':
		case 'Info':
		case 'received':
			return 'info';

		case 'blocked':
		case 'cancel':
		case 'return':
		case 3:
			return 'destructive';

		default:
			return 'default';
	}
};
