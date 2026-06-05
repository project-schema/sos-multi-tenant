import { useAppSelector } from '@/store/hooks';
import Checkout from './checkout/Checkout';

export function AdvertiserFormTab4Checkout({
	createAdvertise,
	isLoading,
}: {
	createAdvertise: (data: any) => any;
	isLoading: boolean;
}) {
	const level2 = useAppSelector((state) => state.advertiseForm);
	return (
		<div>
			<Checkout createAdvertise={createAdvertise} isLoading={isLoading} />
		</div>
	);
}
