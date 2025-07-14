import React from 'react';
import ContentLoader from 'react-content-loader';

export const GridLoader = (props: any) => {
	return (
		<ContentLoader viewBox="0 0 820 450" height="100%" width="100%" {...props}>
			<rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
			<rect x="280" y="10" rx="5" ry="5" width="260" height="280" />
			<rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
			<rect x="10" y="160" rx="5" ry="5" width="260" height="280" />
			<rect x="280" y="300" rx="5" ry="5" width="260" height="140" />
			<rect x="550" y="160" rx="5" ry="5" width="260" height="280" />
		</ContentLoader>
	);
};

export const DashLoader = (props: any) => (
	<ContentLoader
		height="100%"
		width="100%"
		viewBox="0 0 1200 200"
		backgroundColor="#eaeced"
		foregroundColor="#ffffff"
		{...props}
	>
		<rect x="68" y="37" rx="3" ry="3" width="298" height="129" />
		<rect x="426" y="37" rx="3" ry="3" width="298" height="129" />
		<rect x="786" y="37" rx="3" ry="3" width="298" height="129" />
	</ContentLoader>
);

export const PricingLoader = (props: any) => {
	return (
		<ContentLoader
			speed={2}
			width={300}
			height={615}
			viewBox="0 0 300 615"
			backgroundColor="#eaeced"
			foregroundColor="#c4c4c4"
			{...props}
		>
			<rect x="79" y="20" rx="0" ry="0" width="0" height="1" />
			<rect x="4" y="1" rx="0" ry="0" width="3" height="600" />
			<rect x="4" y="598" rx="0" ry="0" width="294" height="3" />
			<rect x="158" y="596" rx="0" ry="0" width="5" height="3" />
			<rect x="5" y="1" rx="0" ry="0" width="294" height="3" />
			<rect x="296" y="1" rx="0" ry="0" width="3" height="600" />
			<rect x="5" y="60" rx="0" ry="0" width="294" height="3" />
			<rect x="22" y="20" rx="0" ry="0" width="129" height="23" />
			<rect x="35" y="76" rx="4" ry="4" width="81" height="9" />
			<rect x="271" y="22" rx="4" ry="4" width="18" height="18" />
			<rect x="186" y="76" rx="4" ry="4" width="81" height="9" />
			<rect x="150" y="63" rx="0" ry="0" width="2" height="44" />
			<rect x="6" y="104" rx="0" ry="0" width="144" height="3" />
			<rect x="152" y="106" rx="0" ry="0" width="145" height="1" />
			<rect x="28" y="127" rx="4" ry="4" width="243" height="31" />
			<rect x="62" y="188" rx="4" ry="4" width="148" height="19" />
			<circle cx="39" cy="197" r="10" />
			<circle cx="39" cy="247" r="10" />
			<circle cx="39" cy="297" r="10" />
			<circle cx="39" cy="347" r="10" />
			<rect x="64" y="237" rx="4" ry="4" width="148" height="19" />
			<rect x="65" y="287" rx="4" ry="4" width="148" height="19" />
			<rect x="64" y="337" rx="4" ry="4" width="148" height="19" />
			<circle cx="39" cy="547" r="10" />
		</ContentLoader>
	);
};

export const ImageList = (props: any) => {
	return (
		<ContentLoader
			viewBox="0 0 778 116"
			width={'100%'}
			height={'100'}
			{...props}
		>
			<rect x="37" y="34" rx="0" ry="0" width="0" height="0" />
			<rect x="28" y="29" rx="0" ry="0" width="258" height="32" />
			<rect x="28" y="71" rx="0" ry="0" width="465" height="32" />
			<rect x="434" y="94" rx="0" ry="0" width="0" height="0" />
			<rect x="29" y="116" rx="0" ry="0" width="749" height="32" />
		</ContentLoader>
	);
};
