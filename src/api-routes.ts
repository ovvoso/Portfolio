// ─── ROUTES API ───────────────────────────────────────────────────────────────
// Ces fichiers vont dans : app/api/
// Structure Next.js App Router
//
// ╔══════════════════════════════════════════════════════╗
// ║  COPIE CHAQUE BLOC dans le bon fichier indiqué       ║
// ╚══════════════════════════════════════════════════════╝

// ────────────────────────────────────────────────────────
// FICHIER 1 : app/api/profile/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { seedDatabase } from '@/lib/seed';

export async function GET() {
  await seedDatabase(); // peuple la DB au 1er appel si vide
  const profile = await prisma.profile.findFirst();
  return NextResponse.json(profile);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const profile = await prisma.profile.upsert({
    where: { id: 1 },
    update: data,
    create: { id: 1, ...data },
  });
  return NextResponse.json(profile);
}
*/

// ────────────────────────────────────────────────────────
// FICHIER 2 : app/api/projects/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const project = await prisma.project.create({ data });
  return NextResponse.json(project, { status: 201 });
}
*/

// ────────────────────────────────────────────────────────
// FICHIER 3 : app/api/projects/[id]/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { id, createdAt, ...data } = body;
  const project = await prisma.project.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(project);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.project.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
*/

// ────────────────────────────────────────────────────────
// FICHIER 4 : app/api/skills/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const skills = await prisma.skill.findMany({ orderBy: { category: 'asc' } });
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const skill = await prisma.skill.create({ data });
  return NextResponse.json(skill, { status: 201 });
}
*/

// ────────────────────────────────────────────────────────
// FICHIER 5 : app/api/skills/[id]/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { id, ...data } = body;
  const skill = await prisma.skill.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(skill);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.skill.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
*/

// ────────────────────────────────────────────────────────
// FICHIER 6 : app/api/experiences/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const experiences = await prisma.experience.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { id, ...data } = body;
  const experience = await prisma.experience.create({ data });
  return NextResponse.json(experience, { status: 201 });
}
*/

// ────────────────────────────────────────────────────────
// FICHIER 7 : app/api/experiences/[id]/route.ts
// ────────────────────────────────────────────────────────
/*
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { id, createdAt, ...data } = body;
  const experience = await prisma.experience.update({
    where: { id: parseInt(params.id) },
    data,
  });
  return NextResponse.json(experience);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.experience.delete({ where: { id: parseInt(params.id) } });
  return NextResponse.json({ success: true });
}
*/

export {};
