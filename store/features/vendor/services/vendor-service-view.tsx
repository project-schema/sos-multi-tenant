'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { env } from '@/lib';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { iVendorServices } from './vendor-services-type';

export function VendorServiceView({ service }: { service: iVendorServices }) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFading, setIsFading] = useState(false);

	const coverImage = service.image
		? `${env.baseAPI}/${service.image}`
		: '/placeholder.svg';

	const gallery = [
		{ id: 'cover', image: coverImage },
		...(service.serviceimages || []).map((img) => ({
			id: img.id ?? crypto.randomUUID(),
			image: img.images ? `${env.baseAPI}/${img.images}` : '/placeholder.svg',
		})),
	].filter((img) => img.image);

	const changeImage = (direction: 1 | -1) => {
		if (gallery.length === 0) return;
		setIsFading(true);
		setTimeout(() => {
			setCurrentIndex(
				(prev) => (prev + direction + gallery.length) % gallery.length
			);
			setIsFading(false);
		}, 150);
	};

	const nextImage = () => changeImage(1);
	const previousImage = () => changeImage(-1);

	const packages = service.servicepackages || [];
	const defaultTab =
		packages.length > 0 ? packages[0].id.toString() : 'no-package';

	return (
		<div className="grid lg:grid-cols-3 gap-6">
			<Card className="lg:col-span-2">
				<CardHeader className="space-y-2">
					{service.reason && service.status === 'rejected' && (
						<Alert variant="destructive">
							<AlertTitle>Service Rejected</AlertTitle>
							<AlertDescription>{service.reason}</AlertDescription>
						</Alert>
					)}
					<div className="flex items-start justify-between gap-4">
						<div className="space-y-2">
							<div className="flex items-center gap-3">
								<CardTitle className="text-2xl font-semibold">
									{service.title}
								</CardTitle>
								<Badge
									variant={
										service.status === 'active' ? 'default' : 'secondary'
									}
								>
									{service.status}
								</Badge>
							</div>
							<div className="text-sm text-muted-foreground">
								Commission: {service.commission} ({service.commission_type})
							</div>
						</div>
					</div>
					{service.tags?.length ? (
						<div className="flex flex-wrap gap-2">
							{service.tags.map((tag) => (
								<Badge key={tag} variant="outline">
									{tag}
								</Badge>
							))}
						</div>
					) : null}
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="relative w-full overflow-hidden rounded-xl bg-muted aspect-video">
						<Button
							variant="ghost"
							size="icon"
							className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
							onClick={previousImage}
						>
							<ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
						</Button>

						<img
							src={gallery[currentIndex]?.image || '/placeholder.svg'}
							alt={service.title}
							className={`object-cover w-full h-full transition-all duration-200 group-hover:scale-105 ${
								isFading ? 'opacity-0' : 'opacity-100'
							}`}
						/>

						<Button
							variant="ghost"
							size="icon"
							className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 bg-white/80 hover:bg-white"
							onClick={nextImage}
						>
							<ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
						</Button>
					</div>

					{gallery.length > 1 ? (
						<div className="flex justify-center gap-3 sm:gap-4 mt-4 flex-wrap">
							{gallery.slice(0, 6).map((img, index) => (
								<button
									key={`${img.id}-${index}`}
									onClick={() => {
										if (index === currentIndex) return;
										setIsFading(true);
										setTimeout(() => {
											setCurrentIndex(index);
											setIsFading(false);
										}, 150);
									}}
									className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all
                  ${
										currentIndex === index
											? 'ring-2 ring-black'
											: 'hover:ring-1 hover:ring-gray-200'
									}`}
								>
									<img
										src={img.image}
										alt={`${service.title} thumbnail ${index}`}
										className="object-cover w-full h-full"
									/>
								</button>
							))}
						</div>
					) : null}

					<Separator />

					<div className="space-y-2">
						<h3 className="text-lg font-semibold">Details</h3>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{service.description}
						</p>
					</div>
				</CardContent>
			</Card>

			<Card className="lg:col-span-1">
				<CardHeader>
					<CardTitle>Packages</CardTitle>
				</CardHeader>
				<CardContent>
					{packages.length === 0 ? (
						<div className="text-sm text-muted-foreground">
							No packages available for this service.
						</div>
					) : (
						<Tabs defaultValue={defaultTab} className="w-full">
							<TabsList className="w-full justify-start overflow-x-auto">
								{packages.map((pkg) => (
									<TabsTrigger
										key={pkg.id}
										value={pkg.id.toString()}
										className="text-left whitespace-nowrap"
									>
										{pkg.package_title}
									</TabsTrigger>
								))}
							</TabsList>
							{packages.map((pkg) => (
								<TabsContent key={pkg.id} value={pkg.id.toString()}>
									<div className="space-y-3 p-2">
										<div className="flex items-center justify-between">
											<span className="text-base font-semibold">
												{pkg.package_title}
											</span>
											<Badge variant="outline">${pkg.price}</Badge>
										</div>
										<p className="text-sm text-muted-foreground">
											{pkg.package_description}
										</p>
										<div className="text-sm text-muted-foreground space-y-1">
											<p>Delivery time: {pkg.time}</p>
											<p>Revision max: {pkg.revision_max_time}</p>
										</div>
									</div>
								</TabsContent>
							))}
						</Tabs>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
