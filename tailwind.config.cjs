module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				stringTheme: {
					primary: '#006AB7',

					secondary: '#F92572',

					accent: '#37CDBE',

					neutral: '#3D4451',

					'base-100': '#FFFFFF',

					info: '#3ABFF8',

					success: '#36D399',

					warning: '#FBBD23',

					error: '#F87272'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
