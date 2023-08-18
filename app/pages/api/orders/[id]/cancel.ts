// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Order } from 'models/types';
import { siweServer } from 'utils/siweServer';

import jwt from 'jsonwebtoken';
import { minkeApi } from '../../utils/utils';

// eslint-disable-next-line import/order
import type { NextApiRequest, NextApiResponse } from 'next';

const cancelOrder = async (id: string, body: NextApiRequest['body'], token: string): Promise<Order> => {
	const { data } = await minkeApi.patch(`/orders/${id}/cancel`, body, {
		headers: {
			Authorization: `Bearer ${token}`
		}
	});
	return data.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Order>) {
	const {
		body,
		query: { id }
	} = req;
	const { address } = await siweServer.getSession(req, res);

	const encodedToken = jwt.sign(
		{ sub: address, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
		process.env.NEXTAUTH_SECRET!,
		{
			algorithm: 'HS256'
		}
	);

	try {
		const result = await cancelOrder(id as string, body, encodedToken);
		res.status(200).json(result);
	} catch (err) {
		res.status(500).json({} as Order);
	}
}
