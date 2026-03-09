// ─── SECTIONS DU PORTFOLIO PUBLIC ────────────────────────────────────────────
// Chaque section est un composant indépendant.
// Props explicites : pas d'accès direct au store global.

import React, { useState } from 'react';
import type { Profile, Skill, Project, Experience, PortfolioSection } from '../../types';
import { FEATURED_PROJECTS_COUNT, EXPERIENCE_TYPE_COLORS } from '../../constants';
import { Card, Badge, TechTag, SectionTitle, ToggleGroup } from '../ui';
import { GitHubIcon, LinkedInIcon, MailIcon, ExternalLinkIcon, StarIcon, MapPinIcon, PhoneIcon } from '../icons';

// ── HERO ──────────────────────────────────────────────────────────────────────

interface HeroProps {
  profile: Profile;
  projectCount: number;
  skillCount: number;
  categoryCount: number;
  featuredProjects: Project[];
  onNavigate: (s: PortfolioSection) => void;
}

export function HeroSection({ profile, projectCount, skillCount, categoryCount, featuredProjects, onNavigate }: HeroProps) {
  return (
    <div>
      {/* Hero principal */}
      <section style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', padding: '60px 24px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="animate-slideUp">
          {/* Disponibilité */}
          {profile.available && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <span className="animate-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              <span style={{ color: '#34d399', fontSize: 14, fontWeight: 500 }}>Disponible pour des missions</span>
            </div>
          )}

          {/* Titre */}
          <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: 16, color: '#f1f5f9' }}>
            Bonjour, je suis<br />
            <span className="gradient-text">{profile.name}</span>
          </h1>

          <p style={{ fontSize: 20, color: '#818cf8', fontWeight: 600, marginBottom: 16 }}>{profile.title}</p>
          <p style={{ fontSize: 16, color: '#94a3b8', maxWidth: 580, lineHeight: 1.7, marginBottom: 40 }}>{profile.bio}</p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
            <button
              onClick={() => onNavigate('projects')}
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              Voir mes projets
            </button>
            <button
              onClick={() => onNavigate('contact')}
              style={{ background: 'transparent', color: '#818cf8', border: '1px solid rgba(99,102,241,0.35)', padding: '14px 28px', borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
            >
              Me contacter
            </button>
          </div>

          {/* Liens sociaux */}
          <div style={{ display: 'flex', gap: 14 }}>
            {[
              { href: profile.github,   icon: <GitHubIcon size={20} /> },
              { href: profile.linkedin, icon: <LinkedInIcon size={20} /> },
              { href: `mailto:${profile.email}`, icon: <MailIcon size={20} /> },
            ].map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noreferrer"
                style={{ color: '#475569', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#818cf8')}
                onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
              >
                {item.icon}
              </a>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: 40, marginTop: 48, flexWrap: 'wrap' }}>
            {[
              { value: projectCount, label: 'Projets' },
              { value: skillCount,   label: 'Technologies' },
              { value: categoryCount, label: 'Domaines' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9' }}>{s.value}+</div>
                <div style={{ fontSize: 13, color: '#64748b' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projets en vedette */}
      {featuredProjects.length > 0 && (
        <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
          <SectionTitle title="Projets mis en avant" subtitle="Mes réalisations principales" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginTop: 40 }}>
            {featuredProjects.slice(0, FEATURED_PROJECTS_COUNT).map(p => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              onClick={() => onNavigate('projects')}
              style={{ background: 'transparent', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)', padding: '11px 22px', borderRadius: 10, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
            >
              Voir tous les projets →
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

// ── SKILLS ────────────────────────────────────────────────────────────────────

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const categories = [...new Set(skills.map(s => s.category))];

  return (
    <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <SectionTitle title="Compétences Techniques" subtitle="Technologies et outils maîtrisés" />
      {categories.map(cat => (
        <div key={cat} style={{ marginTop: 44 }}>
          <h3 style={{ color: '#818cf8', fontSize: 13, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
            {cat}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {skills.filter(s => s.category === cat).map(skill => (
              <div key={skill.id} style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, padding: '14px 16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#e2e8f0' }}>{skill.name}</span>
                  <span style={{ fontSize: 12, color: '#64748b' }}>{skill.level}%</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 4 }}>
                  <div style={{ height: '100%', borderRadius: 4, background: skill.color || '#6366f1', width: `${skill.level}%`, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

// ── PROJECTS ──────────────────────────────────────────────────────────────────

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', ...new Set(projects.map(p => p.category))];
  const filtered = filter === 'Tous' ? projects : projects.filter(p => p.category === filter);

  return (
    <section style={{ padding: '80px 24px', maxWidth: 1100, margin: '0 auto' }}>
      <SectionTitle title="Projets" subtitle={`${projects.length} projets réalisés`} />
      <div style={{ marginTop: 28 }}>
        <ToggleGroup options={categories} value={filter} onChange={setFilter} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: 20, marginTop: 28 }}>
        {filtered.map(p => <ProjectCard key={p.id} project={p} />)}
      </div>
    </section>
  );
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card hoverable style={{ position: 'relative', overflow: 'hidden' }}>
      {project.featured && (
        <div style={{ position: 'absolute', top: 16, right: 16 }}>
          <Badge color="yellow"><StarIcon size={10} /> Vedette</Badge>
        </div>
      )}
      <div style={{ marginBottom: 10 }}>
        <Badge color="indigo">{project.category}</Badge>
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 10 }}>{project.title}</h3>
      <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6, marginBottom: 16 }}>{project.description}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {project.technologies.map(t => <TechTag key={t} name={t} />)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#818cf8', fontSize: 13, fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(99,102,241,0.3)', padding: '6px 12px', borderRadius: 8 }}
          >
            <GitHubIcon size={14} /> Code
          </a>
        )}
        {project.demo && (
          <a href={project.demo} target="_blank" rel="noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34d399', fontSize: 13, fontWeight: 500, textDecoration: 'none', border: '1px solid rgba(16,185,129,0.3)', padding: '6px 12px', borderRadius: 8 }}
          >
            <ExternalLinkIcon size={14} /> Demo
          </a>
        )}
      </div>
    </Card>
  );
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  return (
    <section style={{ padding: '80px 24px', maxWidth: 900, margin: '0 auto' }}>
      <SectionTitle title="Parcours" subtitle="Expériences & Formation" />
      <div style={{ marginTop: 48, position: 'relative' }}>
        <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 1, background: 'rgba(99,102,241,0.2)' }} />
        {experiences.map((exp, i) => {
          const colors = EXPERIENCE_TYPE_COLORS[exp.type] || EXPERIENCE_TYPE_COLORS['Autre'];
          return (
            <div key={exp.id} style={{ position: 'relative', paddingLeft: 56, marginBottom: 28, animationDelay: `${i * 0.1}s` }} className="animate-slideUp">
              <div style={{ position: 'absolute', left: 10, top: 5, width: 20, height: 20, borderRadius: '50%', background: colors.bg, border: `2px solid ${colors.border}` }} />
              <div style={{ background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 14, padding: '18px 22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9' }}>{exp.title}</h3>
                    <p style={{ fontSize: 14, color: '#818cf8', fontWeight: 500 }}>{exp.company}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <Badge color={exp.type === 'Stage' ? 'green' : exp.type === 'Formation' ? 'yellow' : 'indigo'}>
                      {exp.type}
                    </Badge>
                    <span style={{ fontSize: 12, color: '#64748b' }}>{exp.period}</span>
                    {exp.current && <Badge color="green">● En cours</Badge>}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{exp.description}</p>
                {exp.technologies.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {exp.technologies.map(t => <TechTag key={t} name={t} />)}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ── CONTACT ───────────────────────────────────────────────────────────────────

export function ContactSection({ profile }: { profile: Profile }) {
  const contacts = [
    { icon: <MailIcon size={18} />,    label: profile.email,                  href: `mailto:${profile.email}` },
    { icon: <GitHubIcon size={18} />,  label: 'github.com/ovvoso',            href: profile.github },
    { icon: <LinkedInIcon size={18} />, label: 'LinkedIn',                    href: profile.linkedin },
    { icon: <PhoneIcon size={18} />,   label: profile.phone,                  href: `tel:${profile.phone}` },
    { icon: <MapPinIcon size={18} />,  label: profile.location,               href: undefined },
  ];

  return (
    <section style={{ padding: '80px 24px', maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
      <SectionTitle title="Contact" subtitle="Travaillons ensemble" />
      <p style={{ color: '#94a3b8', fontSize: 16, marginTop: 16, marginBottom: 40, lineHeight: 1.7 }}>
        Disponible pour des missions freelance, stages ou opportunités d'emploi. N'hésitez pas à me contacter !
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        {contacts.map((item, i) => {
          const inner = (
            <div key={i}
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(15,23,42,0.9)', border: '1px solid rgba(99,102,241,0.2)', padding: '14px 28px', borderRadius: 12, color: '#e2e8f0', fontSize: 15, fontWeight: 500, width: '100%', maxWidth: 360, justifyContent: 'center', cursor: item.href ? 'pointer' : 'default', transition: 'border-color 0.2s' }}
              onMouseEnter={e => item.href && (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)')}
            >
              <span style={{ color: '#818cf8' }}>{item.icon}</span>
              {item.label}
            </div>
          );
          return item.href
            ? <a key={i} href={item.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', width: '100%', display: 'flex', justifyContent: 'center' }}>{inner}</a>
            : inner;
        })}
      </div>
    </section>
  );
}
