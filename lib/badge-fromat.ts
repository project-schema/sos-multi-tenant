import { badgeVariants } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';

type BadgeVariant = VariantProps<typeof badgeVariants>;
type Badge = BadgeVariant['variant'];

export const badgeFormat = (status: string | number): Badge => {
	switch (status) {
		case 'User':
			return 'secondary';

		case 'Drop Shipper':
			return 'outline';

		case 'active':
			return 'success';

		case 'pending':
		case 'Merchant':
			return 'warning';

		case 'Admin':
		case 'Info':
			return 'info';

		case 'blocked':
			return 'destructive';

		default:
			return 'default';
	}
};
