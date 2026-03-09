// ─── AUTHENTIFICATION ─────────────────────────────────────────────────────────
// Logique d'authentification isolée.
// TODO Next.js production : remplacer par NextAuth.js + JWT.

import { ADMIN_PASSWORD } from '../constants';

/**
 * Vérifie si le mot de passe fourni est valide.
 * TODO production : hash bcrypt côté serveur, jamais comparer en clair.
 */
export function checkAdminPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
