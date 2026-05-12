'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ServiceProductViewGallery from '../../_sub-components/service-product-view-gallery';
import { iService } from '../../type';

export function AdminServiceViewPage({ service }: { service: iService }) {
	const packages = service.servicepackages || [];
	const defaultTab =
		packages.length > 0 ? packages[0].id.toString() : 'no-package';

	return (
		<div className="grid lg:grid-cols-3 gap-6">
			<ServiceProductViewGallery service={service} />

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
