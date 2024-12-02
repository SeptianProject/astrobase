/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				dark: '#191820',
				primary: '#312058',
				secondary: '#3848E9',
				tertiary: '#5E5A5A',
			}
		},
	},
	plugins: [],
}
