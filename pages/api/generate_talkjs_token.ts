// pages/api/generate_talkjs_token.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { user_id } = req.body;
	const secret_key = process.env.TALKJS_SECRET_KEY;
	const app_id = process.env.TALKJS_APP_ID;

	if (!user_id || !secret_key || !app_id) {
		return res.status(400).json({ error: 'Missing parameters' });
	}

	try {
		const token = jwt.sign(
			{ tokenType: 'user', iss: app_id, sub: user_id, exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 },
			secret_key,
			{ algorithm: 'HS256' }
		);
		return res.status(200).json({ token });
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ error: error.message });
		} else {
			return res.status(500).json({ error: 'An unknown error occurred' });
		}
	}
}
