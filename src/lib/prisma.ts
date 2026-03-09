// ─── CLIENT PRISMA ────────────────────────────────────────────────────────────
// Instance unique de Prisma pour toute l'application.
// Le pattern singleton évite trop de connexions en développement.

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
