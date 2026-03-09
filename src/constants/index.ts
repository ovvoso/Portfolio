// ─── CONSTANTES APPLICATION ───────────────────────────────────────────────────
// Toutes les valeurs "magiques" sont centralisées ici.
// Pour changer le mot de passe admin, on ne touche qu'à ce fichier.

import type { NavLink, SkillCategory, ProjectCategory, ExperienceType } from '../types';

export const ADMIN_PASSWORD = 'admin2024';
export const STORAGE_KEY = 'portfolio_data_v1';
export const APP_VERSION = '1.0.0';

export const NAV_LINKS: NavLink[] = [
  { id: 'home',       label: 'Accueil'      },
  { id: 'skills',     label: 'Compétences'  },
  { id: 'projects',   label: 'Projets'      },
  { id: 'experience', label: 'Parcours'     },
  { id: 'contact',    label: 'Contact'      },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  'Langages', 'Frameworks', 'Bases de données', 'Outils', 'Autre',
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Web', 'Desktop', 'Mobile', 'API', 'Autre',
];

export const EXPERIENCE_TYPES: ExperienceType[] = [
  'Freelance', 'Stage', 'CDI', 'CDD', 'Formation', 'Autre',
];

export const EXPERIENCE_TYPE_COLORS: Record<ExperienceType, { bg: string; border: string; text: string }> = {
  Freelance:  { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.3)',  text: '#818cf8' },
  Stage:      { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)',  text: '#34d399' },
  Formation:  { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)',  text: '#fbbf24' },
  CDI:        { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  text: '#60a5fa' },
  CDD:        { bg: 'rgba(139,92,246,0.15)',  border: 'rgba(139,92,246,0.3)',  text: '#a78bfa' },
  Autre:      { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8' },
};

export const NOTIFICATION_DURATION_MS = 3000;
export const FEATURED_PROJECTS_COUNT = 3;
