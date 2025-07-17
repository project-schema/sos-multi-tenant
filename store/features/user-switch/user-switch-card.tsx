import { Briefcase, Truck } from 'lucide-react';
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import homeImage from './user-home.gif';
import Image from 'next/image';
import Link from 'next/link';

export const UserSwitchCard = () => {
	return (
		<div>
			<div className="mb-12 max-w-md mx-auto">
				<Image alt="home" src={homeImage} className="w-1/2 md:w-full mx-auto" />
				<p className="text-center mt-2 text-xl font-medium text-gray-700">
					Welcome to the SOS
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
				<JoinCard
					icon={Briefcase}
					title="Merchant"
					description="Join as a Merchant and grow your business."
					buttonText="Join as a Merchant"
					from="vendor"
				/>
				<JoinCard
					icon={Truck}
					title="Dropshipper"
					description="Join as a Drop Shipper and sell without inventory."
					buttonText="Join as a Drop Shipper"
					from="affiliate"
				/>
			</div>
		</div>
	);
};
const JoinCard = ({
	icon: Icon,
	title,
	description,
	buttonText,
	from,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	buttonText: string;
	from: 'vendor' | 'affiliate';
}) => (
	<Card className="hover:shadow-md transition duration-300">
		<CardHeader className="flex flex-row items-center gap-4">
			<div className="p-3 bg-stone-200 rounded-full">
				<Icon className="w-5 h-5 text-primary" />
			</div>
			<div>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{description}</CardDescription>
			</div>
		</CardHeader>
		<CardContent>
			<Button>
				<Link href={`/user/switch?from=${from}`}>{buttonText}</Link>
			</Button>
		</CardContent>
	</Card>
);
