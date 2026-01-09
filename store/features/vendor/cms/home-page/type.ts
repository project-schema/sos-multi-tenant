export type iSystem = {
	id: number;
	app_name: string;
	home_page_title: string;
	color_primary: string;
	deleted_at: null;
	created_at: null;
	updated_at: null;

	theme: 'one' | 'two' | 'three';

	seo_meta_title: string;
	seo_meta_description: string;
	seo_meta_keywords: string;
	seo_meta_image: string;

	scripts_google_analytics: string;
	scripts_google_adsense: string;
	scripts_google_recaptcha: string;
	scripts_facebook_pixel: string;
	scripts_facebook_messenger: string;
	scripts_whatsapp_chat: string;
	scripts_google_tag_manager: string;

	footer_logo: string;
	footer_description: string;
	footer_contact_number_one: string;
	footer_contact_address_one: string;
	footer_contact_number_two: string;
	footer_contact_address_two: string;
	footer_copyright_text: string;
	footer_payment_methods: string;
};

export type iSystemResponse = {
	status: true;
	data: iSystem;
};
