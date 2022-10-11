import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['lodash']
	}
};

export default config;
