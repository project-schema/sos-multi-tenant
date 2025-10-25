import Checkout from './checkout/Checkout';

export function AdvertiserFormTab4Checkout({
	createAdvertise,
	isLoading,
}: {
	createAdvertise: (data: any) => any;
	isLoading: boolean;
}) {
	return (
		<div>
			<Checkout createAdvertise={createAdvertise} isLoading={isLoading} />
		</div>
	);
}
