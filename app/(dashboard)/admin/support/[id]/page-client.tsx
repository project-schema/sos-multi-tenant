'use client';
import { Container1, DbHeader } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { image, imageFormat } from '@/lib';
import { dateFormat } from '@/lib/date-format';
import { useAdminSupportViewQuery } from '@/store/features/admin/support/admin.support.api.slice';
import { AdminSupportProfile } from '@/store/features/admin/support/admin.support.profile';
import { AdminSupportReplay } from '@/store/features/admin/support/admin.support.replay';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const breadcrumbItems = [
	{ name: 'Dashboard', path: '/admin' },
	{ name: 'Support', path: '/admin/support' },
	{ name: 'View' },
];
export default function Page() {
	const { id } = useParams();
	const { data, isLoading, isError } = useAdminSupportViewQuery({
		id: id as string,
	});

	const supportData = data?.message;

	// Create a ref to the message container
	const messageContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		// Scroll to the bottom of the messages container when the component mounts or updates
		if (messageContainerRef.current) {
			messageContainerRef.current.scrollTop =
				messageContainerRef.current.scrollHeight;
		}
	}, [supportData]); // This effect will trigger whenever supportData changes

	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1
				header={<CardTitle>Support</CardTitle>}
				isLoading={isLoading}
				isError={isError}
			>
				{data && (
					<div className="grid grid-cols-4 gap-4">
						<Card className="hidden md:flex col-span-2 xl:col-span-1">
							<CardHeader>
								<CardTitle className="xl:text-base font-bold">
									#{data.message.ticket_no}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<div>
									<strong>Subject:</strong>
									<span>{data.message.subject}</span>
								</div>
								<div>
									<strong>Description:</strong>
									<span>{data.message.description}</span>
								</div>
								<div>
									<strong>Date:</strong>
									<span>{dateFormat(data.message.created_at)}</span>
								</div>
								<div>
									<Image
										src={image(data.message.file)}
										alt="Support"
										width={300}
										height={300}
										className="rounded-lg"
									/>
								</div>
							</CardContent>
						</Card>
						<Card className="col-span-4 md:col-span-2 xl:col-span-2">
							<CardHeader>
								<CardTitle className="text-center xl:text-base font-bold">
									Support
								</CardTitle>
							</CardHeader>
							<CardContent>
								{/* Messages + Reply Box */}
								<div className="flex flex-col h-[600px]">
									{/* Messages list */}
									{supportData && (
										<div
											ref={messageContainerRef} // Attach ref to the message container
											className="space-y-3 bg-gray-50 h-screen max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-300px)] overflow-y-auto pb-14"
										>
											{supportData?.ticketreplay?.length > 0 ? (
												supportData?.ticketreplay?.map((message) => (
													<div
														key={message.id}
														className={`flex ${
															message.user.role_as === '1'
																? 'justify-end'
																: 'justify-start'
														}`}
													>
														<div
															className={`max-w-[78%] space-y-2 rounded-2xl px-3 py-2 text-sm shadow-sm ${
																message.user.role_as === '1'
																	? 'bg-indigo-600 text-white rounded-br-md'
																	: 'bg-white text-gray-800 border rounded-bl-md'
															}`}
														>
															<div>{message.description}</div>
															<div
																className={`mt-1 text-[10px] space-y-2 ${
																	message.user.role_as === '1'
																		? 'text-indigo-100'
																		: 'text-gray-400'
																}`}
															>
																{message.file && (
																	<img
																		className="max-h-20 rounded-md"
																		src={imageFormat(message.file.name)}
																		alt="image"
																	/>
																)}
																<span>
																	{new Date(
																		message.created_at
																	).toLocaleString()}
																</span>
															</div>
														</div>
													</div>
												))
											) : (
												<div>No messages yet</div>
											)}
										</div>
									)}

									{/* Reply composer (UI only) */}
									<AdminSupportReplay data={data.message} />
								</div>
							</CardContent>
						</Card>
						<Card className="hidden xl:flex col-span-1">
							<CardHeader>
								<CardTitle className="xl:text-base font-bold">
									Profile
								</CardTitle>
							</CardHeader>
							<AdminSupportProfile
								id={
									data.message.tenant_id
										? data.message.tenant_id
										: data.message.user_id.toString()
								}
								is_tenant={data.message.tenant_id ? true : false}
							/>
						</Card>
					</div>
				)}
			</Container1>
		</>
	);
}
