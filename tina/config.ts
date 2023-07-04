import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'setup-cms';

export default defineConfig({
	branch,
	clientId: 'cb764a65-3695-47c6-ab8b-54ecbe307262', // Get this from tina.io
	token: 'f084bfa5150a317d30cdb272479848860b04319d', // Get this from tina.io

	build: {
		outputFolder: 'admin',
		publicFolder: 'static',
	},
	media: {
		tina: {
			mediaRoot: '',
			publicFolder: 'static',
		},
	},
	schema: {
		collections: [],
	},
});
