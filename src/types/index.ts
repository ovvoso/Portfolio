// ─── TYPES MÉTIER ─────────────────────────────────────────────────────────────
// Ce fichier est la source de vérité de toutes les structures de données.
// Toute modification de structure commence ici.

export type SkillCategory = 'Langages' | 'Frameworks' | 'Bases de données' | 'Outils' | 'Autre';
export type ProjectCategory = 'Web' | 'Desktop' | 'Mobile' | 'API' | 'Autre';
export type ExperienceType = 'Freelance' | 'Stage' | 'CDI' | 'CDD' | 'Formation' | 'Autre';

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  location: string;
  available: boolean;
}

export interface Skill {
  id: number;
  name: string;
  category: SkillCategory;
  level: number;       // 0-100
  color: string;       // hex color
}

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  demo: string;
  image: string;
  featured: boolean;
  category: ProjectCategory;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  type: ExperienceType;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface PortfolioData {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
}

// ─── TYPES UI ─────────────────────────────────────────────────────────────────

export type AppView = 'portfolio' | 'login' | 'admin';
export type PortfolioSection = 'home' | 'skills' | 'projects' | 'experience' | 'contact';
export type AdminSection = 'projects' | 'skills' | 'experience' | 'profile';
export type NotificationType = 'success' | 'error';

export interface Notification {
  message: string;
  type: NotificationType;
}

export interface NavLink {
  id: PortfolioSection;
  label: string;
}
