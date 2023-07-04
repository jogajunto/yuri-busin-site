import React from 'react';
import { defineConfig, defineSchema } from 'tinacms';
import { validateIdYoutube } from './functions/validate';
import TypeHiddenField from './components/typeHiddenField';

// Your hosting provider likely exposes this as an environment variable
const branch =
	process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || 'setup-cms';

const schema = defineSchema({
	collections: [
		{
			name: 'blog',
			label: 'Blog',
			path: 'content/blog',
			format: 'md',
			defaultItem() {
				return {
					type: 'blog',
				};
			},
			ui: {
				filename: {
					readonly: true,
					slugify: (values) => {
						return `${values?.title
							?.toLowerCase()
							.replace(/ /g, '-')
							.normalize('NFD')
							.replace(/[\u0300-\u036f]/g, '')
							.replace(/[^a-z0-9-]/g, '')}`;
					},
				},
			},
			fields: [
				{
					type: 'string',
					name: 'title',
					label: 'Título',
					isTitle: true,
					required: true,
				},
				{
					type: 'string',
					name: 'description',
					label: 'Descrição',
					required: true,
				},
				{
					type: 'string',
					name: 'category',
					label: 'Categoria',
					options: ['Recrutamento e seleção', 'Carreira'],
					required: true,
				},
				{
					type: 'string',
					name: 'type',
					label: 'Tipo',
					ui: {
						component: TypeHiddenField,
					},
				},
				{
					type: 'image',
					label: 'Imagem',
					name: 'image',
					required: true,
				},
				{
					label: 'Data de publicação',
					name: 'date',
					type: 'datetime',
					required: true,
				},
				{
					name: 'draft',
					label: 'Draft',
					type: 'boolean',
					description: 'Se marcado, o post não será publicado',
				},
				{
					type: 'rich-text',
					name: 'body',
					label: 'Body',
					isBody: true,
					templates: [
						{
							name: 'YoutubeEmbed',
							label: 'Youtube Embed',
							match: {
								start: '{{<',
								end: '>}}',
								name: 'youtube-embed',
							},
							fields: [
								{
									name: 'id',
									label: 'ID ou Url',
									type: 'string',
									required: true,
									ui: {
										validate: (value?: string) => {
											if (value && value.length === 11) {
												const validate = validateIdYoutube(value);
												if (!validate) {
													return 'ID inválido';
												}
											} else {
												return 'Informe um ID ou cole a URL do video';
											}
										},
										parse: (value?: string) => {
											const validate = validateIdYoutube(value);
											if (validate) {
												return validate;
											}
										},
									},
								},
								{
									name: 'title',
									label: 'Title',
									type: 'string',
									required: true,
								},
							],
						},
					],
				},
			],
		},
	],
});

export default defineConfig({
	branch,
	clientId: 'cb764a65-3695-47c6-ab8b-54ecbe307262',
	token: 'f084bfa5150a317d30cdb272479848860b04319d',

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
	schema,
});
