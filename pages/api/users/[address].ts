// pages/api/users/[address].ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { User } from 'models/types';

import { minkeApi } from '../utils/utils';

// eslint-disable-next-line import/order
import type { NextApiRequest, NextApiResponse } from 'next';

const fetchUser = async (address: string): Promise<User> => {
	const { data } = await minkeApi.get(`/users/${address}`);
	return data.data;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<User>) {
	const { query, method } = req;
	const { address } = query;

	switch (method) {
		case 'GET':
			res.status(200).json(await fetchUser(address as string));
			break;
		default:
			res.setHeader('Allow', ['GET']);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
}
