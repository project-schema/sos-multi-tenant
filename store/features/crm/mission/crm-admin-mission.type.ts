export type iCrmMission = {
	id: number;
	icon_class: string;
	title: string;
	deleted_at: null | string;
	created_at: null | string;
	updated_at: null | string;
};
export type iCrmMissionResponse = {
	status: 200;
	data: iCrmMission[];
};
