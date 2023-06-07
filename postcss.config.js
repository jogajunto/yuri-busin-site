const presetEnv = require('postcss-preset-env');
const customMedia = require('postcss-custom-media');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const atImport = require('postcss-import');

module.exports = {
	plugins: [
		atImport({
			path: ['./assets/css'],
		}),
		presetEnv({ stage: 0 }),
		autoprefixer(),
		customMedia(),
		cssnano({
			preset: 'default',
		}),
	],
};
