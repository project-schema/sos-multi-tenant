'use client';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { imageFormat } from '@/lib';
import { iServiceType } from '@/types/services.type';
import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function ServicesPurchaseGrid({
	services,
}: {
	services: iServiceType[];
}) {
	if (!services || services.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<p className="text-muted-foreground">No services found</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
			{services.map((service) => (
				<Card
					key={service.id}
					className="gap-2 overflow-hidden hover:shadow-lg pt-0 transition-shadow duration-200"
				>
					<Link href={`/dashboard/services/purchase/${service.id}/view`}>
						<div className="relative w-full h-48 bg-muted">
							<Image
								src={imageFormat(service.image)}
								alt={service.title}
								fill
								className="object-cover"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
								unoptimized
							/>
						</div>
					</Link>

					<CardHeader className="pb-0">
						<div className="space-y-2">
							{/* Title */}
							<Link href={`/dashboard/services/purchase/${service.id}/view`}>
								<h3 className="font-semibold text-sm line-clamp-2 hover:text-primary transition-colors">
									{service.title}
								</h3>
							</Link>
						</div>
					</CardHeader>

					<CardContent className="pt-0 pb-0">
						<div className="flex items-center justify-between">
							{/* Rating */}
							<div className="flex items-center gap-1">
								<Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
								<span className="text-sm font-medium">
									{parseFloat(service.servicerating_avg_rating || '0').toFixed(
										1
									)}
								</span>
							</div>

							{/* Price */}
							{service.firstpackage?.price && (
								<div className="text-right">
									<p className="text-xs text-muted-foreground">Starting at</p>
									<p className="text-lg font-bold">
										৳{service.firstpackage.price}
									</p>
								</div>
							)}
						</div>
					</CardContent>

					<CardFooter className="pt-0">
						<Button asChild className="w-full" variant="default">
							<Link href={`/dashboard/services/purchase/${service.id}/view`}>
								View Details
							</Link>
						</Button>
					</CardFooter>
				</Card>
			))}
		</div>
	);
}
