import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = parseInt(req.query.id as string);

  if (req.method === 'PUT') {
    const { id: _id, createdAt, ...data } = req.body;
    const project = await prisma.project.update({ where: { id }, data });
    return res.json(project);
  }

  if (req.method === 'DELETE') {
    await prisma.project.delete({ where: { id } });
    return res.json({ success: true });
  }

  res.status(405).end();
}
