'use client';

import { Button } from '@/components/ui/button';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommonShopSidebar from '../../common/shop-sidebar';

export const ShopMobileFilter = () => {
	const [open, setOpen] = useState(false);
	const searchParams = useSearchParams();

	// 👇 Close sheet when query params change
	useEffect(() => {
		if (open) {
			setOpen(false);
		}
	}, [searchParams]); // triggers on URL change

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button className="bg-orange-500" size="icon">
					<Filter className="size-4" />
				</Button>
			</SheetTrigger>

			<SheetContent
				side="right"
				className="w-[280px] sm:w-[320px] overflow-y-auto"
			>
				<SheetHeader>
					<SheetTitle>Filters</SheetTitle>
				</SheetHeader>

				<div className="mt-6 px-4">
					<CommonShopSidebar />
				</div>
			</SheetContent>
		</Sheet>
	);
};
