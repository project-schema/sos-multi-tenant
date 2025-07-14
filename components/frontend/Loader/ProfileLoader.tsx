import React from 'react';
import ContentLoader from 'react-content-loader';

const ProfileLoader = (props: any) => (
	<ContentLoader
		width={500}
		height={100}
		viewBox="0 0 500 100"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="46" cy="38" r="38" />
	</ContentLoader>
);

export default ProfileLoader;
