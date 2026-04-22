import { API_ENDPOINT, API_TOKEN } from '$env/static/private';
import { json } from '@sveltejs/kit';
import * as v from 'valibot';
import { error, redirect } from '@sveltejs/kit';
import { form } from '$app/server';

export const feedback = form(
	v.object({
		who: v.pipe(v.string(), v.nonEmpty()),
		message: v.pipe(v.string(), v.nonEmpty()),
		company: v.optional(v.string())
	}),
	async ({ who, message, company = '' }) => {
		const body = {
			who,
			message,
			company
		};
		try {
			const response = await fetch(`${API_ENDPOINT}/?user_field_names=true`, {
				method: 'POST',
				headers: {
					Authorization: `Token ${API_TOKEN}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ ...body })
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			return { success: true };
		} catch (error) {
			console.error('Error:', error);
			return error;
		}
	}
);
