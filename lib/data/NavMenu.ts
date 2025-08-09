export const menuData = [
	{
		id: 1,
		menu: 'Home',
		path: '/',
		subRoute: [],
	},
	{
		id: 2,
		menu: 'About Us',
		path: '/about-us',
		subRoute: [],
	},
	{
		id: 3,
		menu: 'Services',
		path: '/services',
		subRoute: [`/service-details/[...id]`],
	},
	{
		id: 4,
		menu: 'Advertise',
		path: '/advertise',
		subRoute: ['/advertise/'],
	},
	{
		id: 5,
		menu: 'Pricing',
		path: '/pricing',
		subRoute: [],
	},
	{
		id: 6,
		menu: 'Contact us',
		path: '/contact-us',
		subRoute: [],
	},
];
