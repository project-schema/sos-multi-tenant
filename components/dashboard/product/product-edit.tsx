'use client';

import { Container1, DbHeader } from '@/components/dashboard';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib';
const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Merchant Products' },
];

export default function Page() {
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Merchant Products</CardTitle>}>
				<div className="grid grid-cols-3 gap-4">
					<Card className={cn('col-span-1 gap-0')}>
						<CardHeader>
							<CardTitle>Image</CardTitle>
						</CardHeader>
						<CardContent>Product List</CardContent>
					</Card>
					<Card className={cn('col-span-2 gap-0')}>
						<CardHeader>
							<CardTitle>Product List</CardTitle>
						</CardHeader>
						<CardContent>
							<Accordion
								type="single"
								collapsible
								className="w-full"
								defaultValue="item-1"
							>
								<AccordionItem value="item-1">
									<AccordionTrigger>Product Information</AccordionTrigger>
									<AccordionContent className="flex flex-col gap-4 text-balance">
										<p>
											Our flagship product combines cutting-edge technology with
											sleek design. Built with premium materials, it offers
											unparalleled performance and reliability.
										</p>
										<p>
											Key features include advanced processing capabilities, and
											an intuitive user interface designed for both beginners
											and experts.
										</p>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-2">
									<AccordionTrigger>Shipping Details</AccordionTrigger>
									<AccordionContent className="flex flex-col gap-4 text-balance">
										<p>
											We offer worldwide shipping through trusted courier
											partners. Standard delivery takes 3-5 business days, while
											express shipping ensures delivery within 1-2 business
											days.
										</p>
										<p>
											All orders are carefully packaged and fully insured. Track
											your shipment in real-time through our dedicated tracking
											portal.
										</p>
									</AccordionContent>
								</AccordionItem>
								<AccordionItem value="item-3">
									<AccordionTrigger>Return Policy</AccordionTrigger>
									<AccordionContent className="flex flex-col gap-4 text-balance">
										<p>
											We stand behind our products with a comprehensive 30-day
											return policy. If you&apos;re not completely satisfied,
											simply return the item in its original condition.
										</p>
										<p>
											Our hassle-free return process includes free return
											shipping and full refunds processed within 48 hours of
											receiving the returned item.
										</p>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
