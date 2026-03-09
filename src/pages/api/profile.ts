import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { seedDatabase } from '@/lib/seed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    await seedDatabase();
    const profile = await prisma.profile.findFirst();
    return res.json(profile);
  }

  if (req.method === 'PUT') {
    const { id, ...data } = req.body;
    const profile = await prisma.profile.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });
    return res.json(profile);
  }

  res.status(405).end();
}
