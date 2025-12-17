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
		case 'My wallet':
		case 'hold':
		case 'progress':
			return 'outline';

		case 'active':
		case 'processing':
		case 'delivered':
		case 'success':
		case 'Ammarpay':
		case '+':
		case 1:
			return 'success';

		case 'pending':
		case 'Merchant':

		case 2:
			return 'warning';

		case 'Admin':
		case 'Woocommerce':
		case 'Info':
		case 'received':
			return 'info';

		case 'blocked':
		case 'cancel':
		case 'canceled':
		case 'return':
		case 'deactive':
		case 'due':
		case 'reject':
		case 'rejected':
		case '-':
		case 3:
			return 'destructive';

		default:
			return 'default';
	}
};
