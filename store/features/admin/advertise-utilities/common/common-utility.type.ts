// Union of valid keys
export type iAdvertiseCommonPath =
	| 'store_reel'
	| 'audience_age'
	| 'audience_age_to'
	| 'device'
	| 'platform'
	| 'feed'
	| 'video_reel'
	| 'search_reel'
	| 'messages_reel'
	| 'apps_web'
	| 'call_to_action';

// Helper: list of valid dynamic paths
export const AdvertiseCommonPaths: iAdvertiseCommonPath[] = [
	'store_reel',
	'audience_age',
	'audience_age_to',
	'device',
	'platform',
	'feed',
	'video_reel',
	'search_reel',
	'messages_reel',
	'apps_web',
	'call_to_action',
];

// Common utilities structure with generic dynamic keys
export type iAdvertiseCommonUtilities<T extends iAdvertiseCommonPath> = {
	id: number;
	campaign_category_id: null;
	category: null;
} & {
	[K in T]: string;
};

// Full response type
export type iAdvertiseCommonUtilitiesResponse<T extends iAdvertiseCommonPath> =
	{
		status: number;
		data: 'success';
		message: iAdvertiseCommonUtilities<T>[];
	};

export type DynamicAddFormat<T extends iAdvertiseCommonPath> = {
	colum_name: iAdvertiseCommonPath;
} & {
	[K in T]: string;
};
