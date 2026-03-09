import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const skills = await prisma.skill.findMany({ orderBy: { category: 'asc' } });
    return res.json(skills);
  }

  if (req.method === 'POST') {
    const { id, ...data } = req.body;
    const skill = await prisma.skill.create({ data });
    return res.status(201).json(skill);
  }

  res.status(405).end();
}
