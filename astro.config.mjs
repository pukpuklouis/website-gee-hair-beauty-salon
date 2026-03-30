// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tinaDirective from "./astro-tina-directive/register"

// Vite plugin to suppress TinaCMS React hooks warnings during build
function suppressTinaCMSWarnings() {
	return {
		name: 'suppress-tinacms-warnings',
		configResolved() {
			const originalWarn = console.warn;
			const originalError = console.error;
			
			// Suppress React hooks warnings from TinaCMS during build
			console.warn = (...args) => {
				const message = args[0];
				if (typeof message === 'string' && 
					message.includes('Invalid hook call')) {
					return;
				}
				originalWarn.apply(console, args);
			};
			
			console.error = (...args) => {
				const message = args[0];
				if (typeof message === 'string' && 
					message.includes('Invalid hook call')) {
					return;
				}
				originalError.apply(console, args);
			};
		}
	};
}

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE_URL || 'https://geehair.com',
	output: 'static',
	adapter: cloudflare({
		platformProxy: {
			enabled: true
		}
	}),
	integrations: [mdx(), sitemap(), react(), tinaDirective()],
	vite: {
		plugins: [suppressTinaCMSWarnings()],
		build: {
			rollupOptions: {
				onwarn(warning, warn) {
					// Suppress TinaCMS generated file warnings
					// TODO: Relevant issue to follow and remove when fixed: https://github.com/tinacms/tinacms/issues/6386
					if (warning.code === 'UNUSED_EXTERNAL_IMPORT' && 
						warning.exporter === 'tinacms/dist/client') {
						return;
					}
					warn(warning);
				}
			}
		}
	}
});
