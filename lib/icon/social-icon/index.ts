import fb from './facebook.svg';
import ins from './ins.svg';
import telegram from './telegram.svg';
import tiktok from './tiktok.svg';
import whatsAPP from './whats-app.svg';
import x from './x.svg';
import youtube from './youtube.svg';

export const socialIcons = {
	fb,
	ins,
	telegram,
	tiktok,
	x,
	whatsAPP,
	youtube,
};

export const webSocialLinks = [
	{
		key: 'fb_url',
		label: 'Facebook',
		icon: socialIcons.fb,
	},
	{
		key: 'x_url',
		label: 'X (Twitter)',
		icon: socialIcons.x,
	},
	{
		key: 'instagram_url',
		label: 'Instagram',
		icon: socialIcons.ins,
	},
	{
		key: 'tiktok_url',
		label: 'TikTok',
		icon: socialIcons.tiktok,
	},
	{
		key: 'youtube_url',
		label: 'YouTube',
		icon: socialIcons.youtube,
	},
	{
		key: 'telegram_url',
		label: 'Telegram',
		icon: socialIcons.telegram,
	},
	{
		key: 'whatsapp_url',
		label: 'WhatsApp',
		icon: socialIcons.whatsAPP,
	},
];
