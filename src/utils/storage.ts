// ─── COUCHE DE PERSISTANCE ────────────────────────────────────────────────────
// VERSION NEXT.JS — appels vers les routes API /api/*
// Prisma + PostgreSQL côté serveur.
// L'interface est identique à la version mémoire : le reste du code ne change pas.

import type { PortfolioData, Project, Skill, Experience, Profile } from '../types';

const API = {
  profile:     '/api/profile',
  projects:    '/api/projects',
  skills:      '/api/skills',
  experiences: '/api/experiences',
};

// ── CHARGEMENT INITIAL ────────────────────────────────────────────────────────

export async function loadPortfolioData(): Promise<PortfolioData> {
  const [profile, projects, skills, experiences] = await Promise.all([
    fetch(API.profile).then(r => r.json()),
    fetch(API.projects).then(r => r.json()),
    fetch(API.skills).then(r => r.json()),
    fetch(API.experiences).then(r => r.json()),
  ]);
  return { profile, projects, skills, experiences };
}

// ── PROFIL ────────────────────────────────────────────────────────────────────

export async function saveProfile(profile: Profile): Promise<Profile> {
  const res = await fetch(API.profile, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
  });
  return res.json();
}

// ── PROJETS ───────────────────────────────────────────────────────────────────

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const res = await fetch(API.projects, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function updateProject(id: number, project: Partial<Project>): Promise<Project> {
  const res = await fetch(`${API.projects}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project),
  });
  return res.json();
}

export async function deleteProject(id: number): Promise<void> {
  await fetch(`${API.projects}/${id}`, { method: 'DELETE' });
}

// ── COMPÉTENCES ───────────────────────────────────────────────────────────────

export async function createSkill(skill: Omit<Skill, 'id'>): Promise<Skill> {
  const res = await fetch(API.skills, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  });
  return res.json();
}

export async function updateSkill(id: number, skill: Partial<Skill>): Promise<Skill> {
  const res = await fetch(`${API.skills}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill),
  });
  return res.json();
}

export async function deleteSkill(id: number): Promise<void> {
  await fetch(`${API.skills}/${id}`, { method: 'DELETE' });
}

// ── EXPÉRIENCES ───────────────────────────────────────────────────────────────

export async function createExperience(exp: Omit<Experience, 'id'>): Promise<Experience> {
  const res = await fetch(API.experiences, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exp),
  });
  return res.json();
}

export async function updateExperience(id: number, exp: Partial<Experience>): Promise<Experience> {
  const res = await fetch(`${API.experiences}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(exp),
  });
  return res.json();
}

export async function deleteExperience(id: number): Promise<void> {
  await fetch(`${API.experiences}/${id}`, { method: 'DELETE' });
}

// ── UTILITAIRE ────────────────────────────────────────────────────────────────

export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}
