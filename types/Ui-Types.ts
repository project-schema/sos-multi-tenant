export interface IMenu {
	id: number;
	menu: string;
	path: string;
	subRoute: string[];
}

export interface IButton {
	text: string;
	path?: string;
	icon?: any;
}

export interface IProgressBarUI {
	value: string;
	text: string;
	line: boolean;
	init: boolean;
}

export interface IPricing {
	id: number;
	tittle: string;
	suggest: boolean;
	pricing: {
		id: number;
		time: string;
		value: number;
	}[];
	features: {
		id: number;
		active: boolean;
		value: string;
	}[];
}

export interface IInput {
	name: string;
	label: string;
	placeholder: string;
	dispatch: Function;
	state: any;
	type?: 'text' | 'password' | 'number' | 'email';
}

export interface IStyle {
	readonly [key: string]: string;
}

export interface ISelectValue {
	label: string;
	value: string;
}
