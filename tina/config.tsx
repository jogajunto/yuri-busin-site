import React from 'react';
import { defineConfig, defineSchema } from 'tinacms';
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
						// Parse slug
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
				// slug: tratamento-ansiedade-melhor
				// category: Cotidiano
				{
					type: 'string',
					name: 'category',
					label: 'Categoria',
					options: ['Recrutamento e seleção', 'Carreira'],
					required: true,
				},
				// type: blog
				{
					type: 'string',
					name: 'type',
					label: 'Tipo',
					ui: {
						component: TypeHiddenField,
					},
				},
				// image: melhor_tratamento_ansiedade.jpg
				{
					type: 'image',
					label: 'Imagem',
					name: 'image',
					required: true,
				},
				// date: 2021-02-24T12:24:14.313Z
				{
					label: 'Data de publicação',
					name: 'date',
					type: 'datetime',
					required: true,
				},
				// draft: false
				{
					name: 'draft',
					label: 'Draft',
					type: 'boolean',
					description: 'Se marcado, o post não será publicado',
				},
			],
		},
	],
});

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
	schema,
});