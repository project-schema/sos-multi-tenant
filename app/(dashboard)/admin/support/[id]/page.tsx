'use client';
import { Container1, DbHeader, Loader8 } from '@/components/dashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { image } from '@/lib';
import { dateFormat } from '@/lib/date-format';
import { useAdminSupportViewQuery } from '@/store/features/admin/support/admin.support.api.slice';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
	if (isLoading) return <Loader8 />;
	if (isError) return <div>Error</div>;
	if (!data) return <div>No data</div>;
	return (
		<>
			<DbHeader breadcrumb={breadcrumbItems} />
			<Container1 header={<CardTitle>Support</CardTitle>}>
				<div className="grid grid-cols-4 gap-4">
					<Card className="col-span-1">
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
					<Card className="col-span-2">
						<CardHeader>
							<CardTitle className="text-center xl:text-base font-bold">
								Support
							</CardTitle>
						</CardHeader>
						<CardContent>
							{/* Messages + Reply Box */}
							<div className="flex flex-col h-[600px]">
								{/* Messages list */}
								<div className="flex-1 overflow-y-auto space-y-3 pr-1">
									{/* Original ticket */}
									<div className="flex justify-start">
										<div className="max-w-full rounded-2xl px-3 py-2 text-sm bg-white border text-gray-800 shadow-sm">
											<div className="font-medium mb-1">Ticket</div>
											<div>{data.message.description}</div>
											<div className="mt-1 text-[10px] text-gray-500">
												{dateFormat(data.message.created_at)}
											</div>
										</div>
									</div>

									{/* Ticket replies */}
									{data.message.ticketreplay?.map((m) => (
										<div key={m.id} className="flex justify-end">
											<div className="max-w-full rounded-2xl px-3 py-2 text-sm bg-white border text-gray-800 shadow-sm">
												<div className="font-medium mb-1">Reply</div>
												<div>{m.description}</div>
												<div className="mt-1 text:[10px] text-gray-500">
													{dateFormat(m.created_at)}
												</div>
											</div>
										</div>
									))}
								</div>

								{/* Reply composer (UI only) */}
								<div className="mt-3 pt-3 border-t flex items-center gap-2">
									<input
										type="text"
										placeholder="Type your reply…"
										className="flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
									/>
									<button
										className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 active:bg-indigo-800"
										type="button"
									>
										Send
									</button>
								</div>
							</div>
						</CardContent>
					</Card>
					<Card className="col-span-1">
						<CardHeader>
							<CardTitle className="xl:text-base font-bold">Profile</CardTitle>
						</CardHeader>
						<CardContent>
							<div>
								{/* <div>
									<span>Name:</span>
									<span>{data.message.user.name}</span>
								</div>
								<div>
									<span>Email:</span>
									<span>{data.message.user.email}</span>
								</div>
								<div>
									<span>Phone:</span>
									<span>{data.message.user.phone}</span>
								</div>
								<div>
									<span>Address:</span>
									<span>{data.message.user.address}</span>
								</div> */}
							</div>
						</CardContent>
					</Card>
				</div>
			</Container1>
		</>
	);
}
