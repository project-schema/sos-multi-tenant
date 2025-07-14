// Create a file, e.g., react-country-state-city.d.ts
declare module 'react-country-state-city' {
	import React, { ReactNode } from 'react';

	interface CountrySelectProps {
		value?: string;
		onChange: (value: string) => void;
		disable?: boolean;
		classes?: Record<string, string>;
		innerRef?: React.Ref<HTMLInputElement>;
		optionLabel?: (option: any) => ReactNode;
		dropdownClass?: string;
		placeHolder?: string;
		containerClassName: string;
	}

	interface StateSelectProps {
		country?: string | number;
		value?: string;
		onChange: (value: string) => void;
		disable?: boolean;
		classes?: Record<string, string>;
		innerRef?: React.Ref<HTMLInputElement>;
		optionLabel?: (option: any) => ReactNode;
		dropdownClass?: string;
		placeHolder?: string;
		countryid?: string | number;
		stateid?: string | number;
		containerClassName: string;
	}

	export const CountrySelect: React.FC<CountrySelectProps>;
	export const StateSelect: React.FC<StateSelectProps>;
}
