export default definePreset({
	name: 'block-preset',
	options: {
		// ...
	},
	handler: async() => {
		await extractTemplates()
		// ...
	},
})
