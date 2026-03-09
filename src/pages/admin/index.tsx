// ─── PAGES ADMIN ──────────────────────────────────────────────────────────────
// Chaque page admin gère un domaine métier.
// Les données arrivent via props — pas d'accès direct au store global.

import React, { useState } from 'react';
import type { Project, Skill, Experience, Profile, ProjectCategory, SkillCategory, ExperienceType } from '../../types';
import { PROJECT_CATEGORIES, SKILL_CATEGORIES, EXPERIENCE_TYPES } from '../../constants';
import { Button, Badge, TechTag, FormField, Input, Textarea, Select, ToggleGroup, IconButton } from '../../components/ui';
import { Modal } from '../../components/ui/Modal';
import { AdminPageHeader, TagInput } from '../../components/admin';
import { EditIcon, TrashIcon, StarIcon } from '../../components/icons';

// ─── ADMIN PROJETS ────────────────────────────────────────────────────────────

interface AdminProjectsProps {
  projects: Project[];
  onAdd: (p: Omit<Project, 'id'>) => void;
  onUpdate: (id: number, p: Partial<Project>) => void;
  onDelete: (id: number) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const EMPTY_PROJECT: Omit<Project, 'id'> = {
  title: '', description: '', longDescription: '',
  technologies: [], github: '', demo: '', image: '',
  featured: false, category: 'Web',
};

export function AdminProjects({ projects, onAdd, onUpdate, onDelete, notify }: AdminProjectsProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Project, 'id'>>(EMPTY_PROJECT);

  const openNew = () => { setForm({ ...EMPTY_PROJECT, technologies: [] }); setEditingId(null); setShowModal(true); };
  const openEdit = (p: Project) => { const { id, ...rest } = p; setForm({ ...rest, technologies: [...rest.technologies] }); setEditingId(id); setShowModal(true); };

  const handleSave = () => {
    if (!form.title.trim()) { alert('Le titre est requis.'); return; }
    if (editingId !== null) {
      onUpdate(editingId, form);
      notify('Projet mis à jour !');
    } else {
      onAdd(form);
      notify('Projet ajouté !');
    }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ce projet ?')) return;
    onDelete(id);
    notify('Projet supprimé.', 'error');
  };

  const set = <K extends keyof Omit<Project, 'id'>>(key: K, value: Omit<Project, 'id'>[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  return (
    <div>
      <AdminPageHeader title="Projets" count={projects.length} onAdd={openNew} />

      {showModal && (
        <Modal title={editingId ? 'Modifier le projet' : 'Nouveau projet'} onClose={() => setShowModal(false)} onSave={handleSave}>
          <FormField label="Titre *">
            <Input value={form.title} onChange={v => set('title', v)} placeholder="Nom du projet" />
          </FormField>
          <FormField label="Catégorie">
            <ToggleGroup options={PROJECT_CATEGORIES} value={form.category} onChange={v => set('category', v as ProjectCategory)} />
          </FormField>
          <FormField label="Description courte">
            <Textarea value={form.description} onChange={v => set('description', v)} placeholder="Résumé en 1-2 phrases" rows={2} />
          </FormField>
          <FormField label="Description détaillée">
            <Textarea value={form.longDescription} onChange={v => set('longDescription', v)} placeholder="Description complète du projet" rows={3} />
          </FormField>
          <FormField label="Lien GitHub">
            <Input value={form.github} onChange={v => set('github', v)} placeholder="https://github.com/..." />
          </FormField>
          <FormField label="Lien Démo (optionnel)">
            <Input value={form.demo} onChange={v => set('demo', v)} placeholder="https://..." />
          </FormField>
          <FormField label="Technologies">
            <TagInput
              tags={form.technologies}
              onAdd={t => set('technologies', [...form.technologies, t])}
              onRemove={t => set('technologies', form.technologies.filter(x => x !== t))}
              placeholder="Ex: Symfony, React..."
            />
          </FormField>
          <FormField label="">
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.featured} onChange={e => set('featured', e.target.checked)} style={{ width: 16, height: 16, accentColor: '#6366f1' }} />
              <span style={{ color: '#e2e8f0', fontSize: 14 }}>Mettre en vedette (affiché sur la page d'accueil)</span>
            </label>
          </FormField>
        </Modal>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
        {projects.map(p => (
          <div key={p.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, padding: 18 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{p.title}</h3>
                <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                  <Badge color="indigo">{p.category}</Badge>
                  {p.featured && <Badge color="yellow"><StarIcon size={9} /> Vedette</Badge>}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <IconButton onClick={() => openEdit(p)} color="#818cf8" title="Modifier"><EditIcon size={14} /></IconButton>
                <IconButton onClick={() => handleDelete(p.id)} color="#ef4444" title="Supprimer"><TrashIcon size={14} /></IconButton>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, marginBottom: 10 }}>{p.description?.slice(0, 100)}{(p.description?.length ?? 0) > 100 ? '…' : ''}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
              {p.technologies.slice(0, 4).map(t => <TechTag key={t} name={t} />)}
              {p.technologies.length > 4 && <span style={{ color: '#475569', fontSize: 11 }}>+{p.technologies.length - 4}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN COMPÉTENCES ────────────────────────────────────────────────────────

interface AdminSkillsProps {
  skills: Skill[];
  onAdd: (s: Omit<Skill, 'id'>) => void;
  onUpdate: (id: number, s: Partial<Skill>) => void;
  onDelete: (id: number) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const EMPTY_SKILL: Omit<Skill, 'id'> = { name: '', category: 'Langages', level: 75, color: '#6366f1' };

export function AdminSkills({ skills, onAdd, onUpdate, onDelete, notify }: AdminSkillsProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Skill, 'id'>>(EMPTY_SKILL);

  const openNew = () => { setForm({ ...EMPTY_SKILL }); setEditingId(null); setShowModal(true); };
  const openEdit = (s: Skill) => { const { id, ...rest } = s; setForm(rest); setEditingId(id); setShowModal(true); };

  const handleSave = () => {
    if (!form.name.trim()) { alert('Le nom est requis.'); return; }
    if (editingId !== null) { onUpdate(editingId, form); notify('Compétence mise à jour !'); }
    else { onAdd(form); notify('Compétence ajoutée !'); }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ?')) return;
    onDelete(id);
    notify('Supprimé.', 'error');
  };

  const set = <K extends keyof Omit<Skill, 'id'>>(key: K, value: Omit<Skill, 'id'>[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  const byCategory = SKILL_CATEGORIES.filter(c => skills.some(s => s.category === c));

  return (
    <div>
      <AdminPageHeader title="Compétences" count={skills.length} onAdd={openNew} />

      {showModal && (
        <Modal title={editingId ? 'Modifier la compétence' : 'Nouvelle compétence'} onClose={() => setShowModal(false)} onSave={handleSave}>
          <FormField label="Nom *">
            <Input value={form.name} onChange={v => set('name', v)} placeholder="Ex: React, Python..." />
          </FormField>
          <FormField label="Catégorie">
            <ToggleGroup options={SKILL_CATEGORIES} value={form.category} onChange={v => set('category', v as SkillCategory)} />
          </FormField>
          <FormField label={`Niveau : ${form.level}%`}>
            <input type="range" min={10} max={100} value={form.level}
              onChange={e => set('level', parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }}
              aria-label={`Niveau : ${form.level}%`}
            />
          </FormField>
          <FormField label="Couleur">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <input type="color" value={form.color} onChange={e => set('color', e.target.value)}
                style={{ width: 44, height: 36, borderRadius: 8, border: 'none', cursor: 'pointer', background: 'transparent' }}
                aria-label="Couleur de la compétence"
              />
              <span style={{ color: '#94a3b8', fontSize: 14 }}>{form.color}</span>
            </div>
          </FormField>
        </Modal>
      )}

      {byCategory.map(cat => (
        <div key={cat} style={{ marginBottom: 28 }}>
          <h3 style={{ color: '#818cf8', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>{cat}</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: 10 }}>
            {skills.filter(s => s.category === cat).map(skill => (
              <div key={skill.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 10, padding: '12px 14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: skill.color }} />
                    <span style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0' }}>{skill.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <IconButton onClick={() => openEdit(skill)} color="#818cf8"><EditIcon size={13} /></IconButton>
                    <IconButton onClick={() => handleDelete(skill.id)} color="#ef4444"><TrashIcon size={13} /></IconButton>
                  </div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 4 }}>
                  <div style={{ height: '100%', borderRadius: 4, background: skill.color, width: `${skill.level}%` }} />
                </div>
                <span style={{ fontSize: 11, color: '#64748b' }}>{skill.level}%</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── ADMIN EXPÉRIENCES ────────────────────────────────────────────────────────

interface AdminExperienceProps {
  experiences: Experience[];
  onAdd: (e: Omit<Experience, 'id'>) => void;
  onUpdate: (id: number, e: Partial<Experience>) => void;
  onDelete: (id: number) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const EMPTY_EXP: Omit<Experience, 'id'> = { title: '', company: '', period: '', type: 'Freelance', description: '', technologies: [], current: false };

export function AdminExperience({ experiences, onAdd, onUpdate, onDelete, notify }: AdminExperienceProps) {
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Experience, 'id'>>(EMPTY_EXP);

  const openNew = () => { setForm({ ...EMPTY_EXP, technologies: [] }); setEditingId(null); setShowModal(true); };
  const openEdit = (e: Experience) => { const { id, ...rest } = e; setForm({ ...rest, technologies: [...rest.technologies] }); setEditingId(id); setShowModal(true); };

  const handleSave = () => {
    if (!form.title.trim()) { alert('Le titre est requis.'); return; }
    if (editingId !== null) { onUpdate(editingId, form); notify('Expérience mise à jour !'); }
    else { onAdd(form); notify('Expérience ajoutée !'); }
    setShowModal(false);
  };

  const handleDelete = (id: number) => {
    if (!confirm('Supprimer ?')) return;
    onDelete(id);
    notify('Supprimé.', 'error');
  };

  const set = <K extends keyof Omit<Experience, 'id'>>(key: K, value: Omit<Experience, 'id'>[K]) =>
    setForm(f => ({ ...f, [key]: value }));

  return (
    <div>
      <AdminPageHeader title="Parcours" count={experiences.length} onAdd={openNew} />

      {showModal && (
        <Modal title={editingId ? 'Modifier' : 'Nouvelle expérience'} onClose={() => setShowModal(false)} onSave={handleSave}>
          <FormField label="Titre *">
            <Input value={form.title} onChange={v => set('title', v)} placeholder="Poste ou diplôme" />
          </FormField>
          <FormField label="Entreprise / École">
            <Input value={form.company} onChange={v => set('company', v)} placeholder="Nom de l'entreprise" />
          </FormField>
          <FormField label="Période">
            <Input value={form.period} onChange={v => set('period', v)} placeholder="Ex: 2023 – Présent" />
          </FormField>
          <FormField label="Type">
            <ToggleGroup options={EXPERIENCE_TYPES} value={form.type} onChange={v => set('type', v as ExperienceType)} />
          </FormField>
          <FormField label="Description">
            <Textarea value={form.description} onChange={v => set('description', v)} rows={3} placeholder="Décrivez vos responsabilités..." />
          </FormField>
          <FormField label="Technologies">
            <TagInput
              tags={form.technologies}
              onAdd={t => set('technologies', [...form.technologies, t])}
              onRemove={t => set('technologies', form.technologies.filter(x => x !== t))}
            />
          </FormField>
          <FormField label="">
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.current} onChange={e => set('current', e.target.checked)} style={{ accentColor: '#6366f1' }} />
              <span style={{ color: '#e2e8f0', fontSize: 14 }}>En cours</span>
            </label>
          </FormField>
        </Modal>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {experiences.map(exp => (
          <div key={exp.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 2 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{exp.title}</span>
                <Badge color={exp.type === 'Stage' ? 'green' : exp.type === 'Formation' ? 'yellow' : 'indigo'}>{exp.type}</Badge>
                {exp.current && <Badge color="green">● En cours</Badge>}
              </div>
              <p style={{ fontSize: 13, color: '#818cf8' }}>{exp.company} · {exp.period}</p>
              <p style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{exp.description?.slice(0, 100)}{(exp.description?.length ?? 0) > 100 ? '…' : ''}</p>
            </div>
            <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
              <IconButton onClick={() => openEdit(exp)} color="#818cf8"><EditIcon size={14} /></IconButton>
              <IconButton onClick={() => handleDelete(exp.id)} color="#ef4444"><TrashIcon size={14} /></IconButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── ADMIN PROFIL ─────────────────────────────────────────────────────────────

interface AdminProfileProps {
  profile: Profile;
  onUpdate: (p: Profile) => void;
  notify: (msg: string) => void;
}

export function AdminProfile({ profile, onUpdate, notify }: AdminProfileProps) {
  const [form, setForm] = useState<Profile>({ ...profile });
  const set = <K extends keyof Profile>(key: K, value: Profile[K]) => setForm(f => ({ ...f, [key]: value }));

  const handleSave = () => { onUpdate(form); notify('Profil mis à jour !'); };

  const fields: { label: string; key: keyof Profile; placeholder: string }[] = [
    { label: 'Nom complet',            key: 'name',     placeholder: 'Votre nom' },
    { label: 'Titre professionnel',    key: 'title',    placeholder: 'Full-Stack Developer...' },
    { label: 'Email',                  key: 'email',    placeholder: 'vous@email.com' },
    { label: 'Téléphone',              key: 'phone',    placeholder: '+221 ...' },
    { label: 'GitHub URL',             key: 'github',   placeholder: 'https://github.com/...' },
    { label: 'LinkedIn URL',           key: 'linkedin', placeholder: 'https://linkedin.com/in/...' },
    { label: 'Localisation',           key: 'location', placeholder: 'Dakar, Sénégal' },
  ];

  return (
    <div>
      <AdminPageHeader title="Profil" />
      <div style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 16, padding: 28, maxWidth: 600 }}>
        {fields.map(f => (
          <div key={f.key} style={{ marginBottom: 16 }}>
            <FormField label={f.label}>
              <Input value={String(form[f.key] ?? '')} onChange={v => set(f.key, v as any)} placeholder={f.placeholder} />
            </FormField>
          </div>
        ))}
        <div style={{ marginBottom: 16 }}>
          <FormField label="Bio">
            <Textarea value={form.bio} onChange={v => set('bio', v)} rows={4} placeholder="Votre présentation..." />
          </FormField>
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
            <input type="checkbox" checked={form.available} onChange={e => set('available', e.target.checked)} style={{ accentColor: '#6366f1' }} />
            <span style={{ color: '#e2e8f0', fontSize: 14 }}>Afficher "Disponible pour des missions"</span>
          </label>
        </div>
        <Button onClick={handleSave}>Sauvegarder le profil</Button>
      </div>
    </div>
  );
}
