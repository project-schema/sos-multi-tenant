import { Award, Calendar, MessageCircle, Shield, Truck } from 'lucide-react';

interface ServiceBenefit {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	subtitle: string;
}

const benefits: ServiceBenefit[] = [
	{
		icon: Award,
		title: 'High Quality',
		subtitle: 'Premium products',
	},
	{
		icon: MessageCircle,
		title: '24/7 Support',
		subtitle: 'Support every time',
	},
	{
		icon: Truck,
		title: 'Express Shipping',
		subtitle: 'Order over $100',
	},
	{
		icon: Shield,
		title: 'Secure Payment',
		subtitle: '100% Secured',
	},
	{
		icon: Calendar,
		title: '30 Days Return',
		subtitle: '30 days guarantee',
	},
];

export default function Card06() {
	return (
		<div className="w-full bg-white py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
			<div className="max-w-[1720px] mx-auto border border-gray-200 rounded-lg px-4 py-2">
				<div className="flex flex-col sm:flex-row items-center justify-between ">
					{benefits.map((benefit, index) => {
						const Icon = benefit.icon;
						return (
							<div
								key={index}
								className=" pr-10 not-last:border-r not-last:border-gray-200 py-9"
							>
								<div className="flex items-center gap-4 px-4 sm:px-6 py-4 sm:py-0 w-full sm:w-auto justify-center sm:justify-start">
									<div className="flex-shrink-0">
										<Icon className="w-10 h-10 text-orange-500 stroke-2" />
									</div>
									<div className="flex flex-col">
										<h3 className="text-base font-bold text-gray-900 mb-1">
											{benefit.title}
										</h3>
										<p className="text-sm text-gray-600 font-normal">
											{benefit.subtitle}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
