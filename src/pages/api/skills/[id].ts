import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (req.method === 'PUT') {
    const { id: _id, ...data } = req.body;
    const skill = await prisma.skill.update({ where: { id }, data });
    return res.json(skill);
  }

  if (req.method === 'DELETE') {
    await prisma.skill.delete({ where: { id } });
    return res.json({ success: true });
  }

  res.status(405).end();
}
