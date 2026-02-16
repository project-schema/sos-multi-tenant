import { iSystem } from '@/store/features/vendor/cms/system/type';
import { env } from './env';

export const themeVariable = (cms: iSystem) => {
	if (cms.theme && cms.theme === 'two') {
		return `
        :root {
          --color-orange-400: ${cms.color_primary || env.color_primary};
          --color-orange-500: ${cms.color_primary || env.color_primary};
          --color-orange-600: ${cms.color_primary || env.color_primary};
          --secondary-color: ${cms.color_secondary || '#ffffff'};
        }
      `;
	} else if (cms.theme && cms.theme === 'one') {
		return `
        :root {
          --color-black: ${cms.color_primary || env.color_primary};
        }
      `;
	} else if (cms.theme && cms.theme === 'three') {
		return `
        :root {
          --primary3: ${cms.color_primary || env.color_primary};
          --secondary-color: ${cms.color_secondary || '#ffffff'};
        }
      `;
	} else {
		return ``;
	}
};
