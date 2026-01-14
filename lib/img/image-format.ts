// import { env } from '../env';

export const imageFormat = (image: string | null) => {
	if (!image) {
		return '/placeholder.svg';
	}
	return `http://localhost:8000/${image}`;
	// return `${env.baseAPI}/${image}`;
};
