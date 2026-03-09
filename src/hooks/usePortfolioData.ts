// ─── HOOK : DONNÉES PORTFOLIO ─────────────────────────────────────────────────
// Centralise toute la logique métier de manipulation des données.
// Les composants ne font JAMAIS de mutation directe — ils passent par ce hook.
// Principe : "Smart hook, dumb components"

import { useState, useEffect, useCallback } from 'react';
import type { PortfolioData, Project, Skill, Experience, Profile } from '../types';
import {
  loadPortfolioData,
  saveProfile,
  createProject, updateProject as apiUpdateProject, deleteProject as apiDeleteProject,
  createSkill, updateSkill as apiUpdateSkill, deleteSkill as apiDeleteSkill,
  createExperience, updateExperience as apiUpdateExperience, deleteExperience as apiDeleteExperience,
  generateId,
} from '../utils/storage';

const EMPTY_DATA: PortfolioData = {
  profile: { name: '', title: '', bio: '', email: '', phone: '', github: '', linkedin: '', location: '', available: false },
  projects: [],
  skills: [],
  experiences: [],
};

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(EMPTY_DATA);

  useEffect(() => {
    loadPortfolioData().then(setData).catch(console.error);
  }, []);

  // ── PROFIL ────────────────────────────────────────────────────────────────
  const updateProfile = useCallback(async (profile: Profile) => {
    const updated = await saveProfile(profile);
    setData(prev => ({ ...prev, profile: updated }));
  }, []);

  // ── PROJETS ───────────────────────────────────────────────────────────────
  const addProject = useCallback(async (project: Omit<Project, 'id'>) => {
    const newProject = await createProject(project);
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  }, []);

  const updateProject = useCallback(async (id: number, updates: Partial<Project>) => {
    const updated = await apiUpdateProject(id, updates);
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? updated : p),
    }));
  }, []);

  const deleteProject = useCallback(async (id: number) => {
    await apiDeleteProject(id);
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  }, []);

  // ── COMPÉTENCES ───────────────────────────────────────────────────────────
  const addSkill = useCallback(async (skill: Omit<Skill, 'id'>) => {
    const newSkill = await createSkill(skill);
    setData(prev => ({ ...prev, skills: [...prev.skills, newSkill] }));
  }, []);

  const updateSkill = useCallback(async (id: number, updates: Partial<Skill>) => {
    const updated = await apiUpdateSkill(id, updates);
    setData(prev => ({
      ...prev,
      skills: prev.skills.map(s => s.id === id ? updated : s),
    }));
  }, []);

  const deleteSkill = useCallback(async (id: number) => {
    await apiDeleteSkill(id);
    setData(prev => ({ ...prev, skills: prev.skills.filter(s => s.id !== id) }));
  }, []);

  // ── EXPÉRIENCES ───────────────────────────────────────────────────────────
  const addExperience = useCallback(async (experience: Omit<Experience, 'id'>) => {
    const newExp = await createExperience(experience);
    setData(prev => ({ ...prev, experiences: [...prev.experiences, newExp] }));
  }, []);

  const updateExperience = useCallback(async (id: number, updates: Partial<Experience>) => {
    const updated = await apiUpdateExperience(id, updates);
    setData(prev => ({
      ...prev,
      experiences: prev.experiences.map(e => e.id === id ? updated : e),
    }));
  }, []);

  const deleteExperience = useCallback(async (id: number) => {
    await apiDeleteExperience(id);
    setData(prev => ({ ...prev, experiences: prev.experiences.filter(e => e.id !== id) }));
  }, []);

  // ── SÉLECTEURS (données dérivées) ─────────────────────────────────────────
  const featuredProjects = data.projects.filter(p => p.featured);
  const skillsByCategory = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return {
    data,
    featuredProjects,
    skillsByCategory,
    updateProfile,
    addProject,
    updateProject,
    deleteProject,
    addSkill,
    updateSkill,
    deleteSkill,
    addExperience,
    updateExperience,
    deleteExperience,
  };
}
