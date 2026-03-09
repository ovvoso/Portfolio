import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const experiences = await prisma.experience.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(experiences);
  }

  if (req.method === 'POST') {
    const { id, ...data } = req.body;
    const experience = await prisma.experience.create({ data });
    return res.status(201).json(experience);
  }

  res.status(405).end();
}
