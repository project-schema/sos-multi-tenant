import { Button } from '@/components/ui/button';
import { sign } from '@/lib';
import { useProfileDataQuery } from '@/store/features/user-profile/user-profile-api-slice';
import { useVendorProfileDataInfoQuery } from '@/store/features/vendor/profile';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function BalanceToggle() {
	const { data: session } = useSession();
	const { data, refetch, isLoading, isFetching } =
		useVendorProfileDataInfoQuery(undefined, {
			refetchOnFocus: false,
			refetchOnMountOrArgChange: false,
			skip:
				session?.tenant_type !== 'merchant' &&
				session?.tenant_type !== 'dropshipper',
		});
	const {
		data: userData,
		refetch: userRefetch,
		isLoading: userLoading,
		isFetching: userFetching,
	} = useProfileDataQuery(undefined, {
		refetchOnFocus: false,
		refetchOnMountOrArgChange: false,
		skip: session?.user?.tenant_type !== 'user',
	});
	const [showBalance, setShowBalance] = useState(false);
	const [isBalanceLoading, setIsBalanceLoading] = useState(false);

	// Auto-hide balance after 1 second
	useEffect(() => {
		if (showBalance) {
			const timer = setTimeout(() => {
				setShowBalance(false);
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [showBalance]);

	const toggleBalance = async () => {
		if (isLoading || isFetching) return;
		if (showBalance) {
			setShowBalance(false);
			return;
		}
		setIsBalanceLoading(true);
		try {
			await refetch();
		} finally {
			setIsBalanceLoading(false);
			setShowBalance(true);
		}
	};

	const userToggleBalance = async () => {
		if (userLoading || userFetching) return;
		if (showBalance) {
			setShowBalance(false);
			return;
		}
		setIsBalanceLoading(true);
		try {
			await userRefetch();
		} finally {
			setIsBalanceLoading(false);
			setShowBalance(true);
		}
	};

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={
				session?.user?.tenant_type === 'user'
					? userToggleBalance
					: toggleBalance
			}
			className="flex items-center gap-2 cursor-pointer"
		>
			{isBalanceLoading || isFetching ? (
				<span className="text-muted-foreground flex items-center gap-1">
					<Loader2 className="h-3 w-3 animate-spin" />
					Loading...
				</span>
			) : showBalance ? (
				<span className="font-medium">
					{sign.tk}{' '}
					{session?.user?.tenant_type === 'user'
						? userData?.user?.balance?.toFixed(2)
						: data?.shop_info?.balance
						? data?.shop_info?.balance
						: 0}
				</span>
			) : (
				<span className="text-muted-foreground">••••</span>
			)}
			{isBalanceLoading || isFetching ? null : showBalance ? (
				<EyeOff className="h-2 w-2" />
			) : (
				<Eye className="h-2 w-2" />
			)}
		</Button>
	);
}
