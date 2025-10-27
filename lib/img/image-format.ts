import { env } from '../env';

export const imageFormat = (image: string | null) => {
	if (!image) {
		return '/placeholder.svg';
	}
	return `${env.baseAPI}/${image}`;
};
