import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    return res.json(projects);
  }

  if (req.method === 'POST') {
    const { id, ...data } = req.body;
    const project = await prisma.project.create({ data });
    return res.status(201).json(project);
  }

  res.status(405).end();
}
