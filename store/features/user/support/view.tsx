'use client';

import { imageFormat } from '@/lib';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useUserSupportViewQuery } from './api-slice';
import { UserSupportReplay } from './user.support.replay';

export function UserSupportView() {
	const { id } = useParams();
	const { data, isLoading, isError, isFetching } = useUserSupportViewQuery(
		{ id: id as string },
		{
			skip: !id,
		},
	);

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
		<div className="grid grid-cols-12 py-4 gap-3">
			{/* Support Information */}
			<div className=" hidden lg:block col-span-3 border rounded-lg p-3">
				<div className="font-semibold text-lg">{supportData?.subject}</div>
				<div className="text-sm text-gray-600 mt-2">
					{supportData?.description}
				</div>
				<div className="mt-2 text-sm text-gray-500">
					<strong>Ticket No: </strong>
					{supportData?.ticket_no}
				</div>
				<div className="text-sm text-gray-500">
					<strong>Status: </strong>
					{supportData?.status}
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 col-span-12 lg:col-span-7 border rounded-lg p-3 space-y-3 relative">
				{supportData && (
					<div
						ref={messageContainerRef} // Attach ref to the message container
						className="space-y-3 bg-gray-50 h-screen max-h-[calc(100vh-200px)] lg:max-h-[calc(100vh-300px)] overflow-y-auto pb-14"
					>
						{supportData?.ticketreplay?.length > 0 ? (
							supportData?.ticketreplay?.map((message) => (
								<div
									key={message.id}
									className={`flex ${message.user.role_as !== '1' ? 'justify-end' : 'justify-start'}`}
								>
									<div
										className={`max-w-[78%] space-y-2 rounded-2xl px-3 py-2 text-sm shadow-sm ${
											message.user.role_as !== '1'
												? 'bg-indigo-600 text-white rounded-br-md'
												: 'bg-white text-gray-800 border rounded-bl-md'
										}`}
									>
										<div>{message.description}</div>
										<div
											className={`mt-1 text-[10px] space-y-2 ${
												message.user.role_as !== '1'
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
												{new Date(message.created_at).toLocaleString()}
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
				{supportData && (
					<div className="absolute bottom-3 w-[calc(100%-1rem)] bg-gray-50">
						<UserSupportReplay data={supportData} />
					</div>
				)}
			</div>
		</div>
	);
}
