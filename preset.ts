import slugify from "slugify";
import {editFiles} from "@preset/core";

export default definePreset({
	name: 'block-preset',
	options: {
		// ...
	},
	handler: async({prompts}) => {
		// ask Block name and slug
		await prompt({ name: 'name', text: 'Block name?' });

		await prompt({ name: 'slug', text: 'Block slug?', default: slugify(prompts.name, {lower: true, trim: true}) });

		await extractTemplates({
			to: 'blocks/' + prompts.slug,
		});

		await renamePaths({
			paths: 'blocks/' + prompts.slug + '/slug.php',
			transformer: prompts.slug + '.php',
		});

		await renamePaths({
			paths: 'blocks/' + prompts.slug + '/slug.scss',
			transformer: prompts.slug + '.scss',
		});

		await editFiles({
			files: [
				'blocks/' + prompts.slug + '/' + prompts.slug + '.php',
				'blocks/' + prompts.slug + '/' + prompts.slug + '.scss',
				'blocks/' + prompts.slug + '/block.json',
			],
			operations: [
				{
					type: 'replace-variables',
					variables: {
						'blockName': prompts.name,
						'blockSlug': prompts.slug,
					},
				}
			],
		});
	},
})
