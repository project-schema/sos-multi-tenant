'use client';

import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useQueryParams } from '@/hooks/useQueryParams';
import { cn } from '@/lib';
import { AdvertiseCommonPaths } from '@/store/features/admin/advertise-utilities';
import Link from 'next/link';

const tabs = [
	{ label: 'Campaign Category', value: 'campaign_category' },
	{ label: 'Conversion Location', value: 'conversion_location' },
	{ label: 'Performance Goal', value: 'performance_goal' },
	{ label: 'Ad Format', value: 'ad_format' },
];

export function SuspensePage({ children }: { children: React.ReactNode }) {
	const { getParam, setParam } = useQueryParams();
	const tab = getParam('tab') || 'campaign_category';
	const isTab = AdvertiseCommonPaths.find((option) => option === tab);

	const handleSelectChange = (value: string) => {
		setParam('tab', value);
	};

	return (
		<>
			<CardHeader className="pb-3 space-y-4">
				<CardTitle className="text-2xl font-bold">
					Advertise Utilities
				</CardTitle>
				<div className="flex flex-wrap gap-2 items-center">
					{tabs.map((item) => (
						<Link
							key={item.value}
							href={`/admin/advertise-utilities?tab=${item.value}`}
						>
							<Button variant={tab === item.value ? 'default' : 'outline'}>
								{item.label}
							</Button>
						</Link>
					))}

					<Select onValueChange={handleSelectChange} value={isTab ? tab : ''}>
						<SelectTrigger
							className={cn(
								`w-[180px] !h-9 py-2 ${
									isTab ? 'bg-accent-foreground text-white' : ''
								}`
							)}
						>
							<SelectValue placeholder="Select Others" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Others</SelectLabel>
								{AdvertiseCommonPaths.map((option) => (
									<SelectItem
										key={option}
										value={option}
										className="capitalize"
									>
										{option.replace(/_/g, '  ')}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardHeader>

			<CardContent className="grid grid-cols-3 gap-4">{children}</CardContent>
		</>
	);
}
