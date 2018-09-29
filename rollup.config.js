import fs from 'fs';
import path from 'path';

export default {
	input: 'main.js',
	output: {
		dir: 'dist',
		entryFileNames: '[name].js',
		chunkFileNames: '[name].js',
		format: 'esm'
	},
	plugins: [
		{
			generateBundle(outputOptions, bundle, isWrite) {
				const chunks = [];

				Object.keys(bundle).forEach(fileName => {
					chunks.push({
						fileName,
						imports: bundle[fileName].imports,
						modules: Object.keys(bundle[fileName].modules).map(fileName => path.relative(process.cwd(), fileName))
					})
				})
				console.log(chunks);

				fs.writeFileSync('result.json', JSON.stringify(chunks, null, '  '));
			}
		}
	],

	// temporary, pending Rollup 1.0
	experimentalCodeSplitting: true
};