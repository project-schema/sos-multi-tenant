export interface INotification {
	id: string;
	type: string;
	notifiable_type: string;
	notifiable_id: number;
	data: {
		user_id: number;
		text: string;
		redirect: string;
	};
	read_at: null;
	created_at: string;
	updated_at: string;
}

export interface INotificationResponse {
	status: number;
	notification: INotification[];
}
