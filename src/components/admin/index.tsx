// ─── ADMIN : COMPOSANTS COMMUNS ───────────────────────────────────────────────

import React from 'react';
import type { AdminSection } from '../../types';
import { Button, IconButton } from '../ui';
import { CodeIcon, CpuIcon, BriefcaseIcon, SettingsIcon, HomeIcon, PlusIcon } from '../icons';

// ── ADMIN SIDEBAR ─────────────────────────────────────────────────────────────

interface SidebarProps {
  current: AdminSection;
  onNavigate: (s: AdminSection) => void;
  onViewPortfolio: () => void;
  ownerInitials: string;
}

const SIDEBAR_ITEMS: { id: AdminSection; label: string; icon: React.ReactNode }[] = [
  { id: 'projects',   label: 'Projets',      icon: <CodeIcon size={18} /> },
  { id: 'skills',     label: 'Compétences',  icon: <CpuIcon size={18} /> },
  { id: 'experience', label: 'Parcours',     icon: <BriefcaseIcon size={18} /> },
  { id: 'profile',    label: 'Profil',       icon: <SettingsIcon size={18} /> },
];

export function AdminSidebar({ current, onNavigate, onViewPortfolio, ownerInitials }: SidebarProps) {
  return (
    <aside style={{
      width: 240,
      background: 'rgba(8,12,24,0.98)',
      borderRight: '1px solid rgba(99,102,241,0.15)',
      padding: '24px 14px',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      top: 0, bottom: 0, left: 0,
      zIndex: 50,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, paddingLeft: 6 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: 'white' }}>
          {ownerInitials}
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>Dashboard</div>
          <div style={{ fontSize: 11, color: '#64748b' }}>Admin</div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
        {SIDEBAR_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: current === item.id ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: current === item.id ? '#818cf8' : '#64748b',
              border: current === item.id ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
              padding: '10px 12px', borderRadius: 10, fontSize: 14, fontWeight: 500,
              textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            {item.icon} {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <button
        onClick={onViewPortfolio}
        style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'transparent', color: '#64748b', border: '1px solid rgba(255,255,255,0.06)', padding: '10px 12px', borderRadius: 10, fontSize: 14, cursor: 'pointer' }}
      >
        <HomeIcon size={18} /> Voir le portfolio
      </button>
    </aside>
  );
}

// ── ADMIN PAGE HEADER ─────────────────────────────────────────────────────────

interface AdminHeaderProps {
  title: string;
  count?: number;
  onAdd?: () => void;
  addLabel?: string;
}

export function AdminPageHeader({ title, count, onAdd, addLabel = 'Ajouter' }: AdminHeaderProps) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#f1f5f9' }}>{title}</h1>
        {count !== undefined && (
          <p style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>
            {count} élément{count > 1 ? 's' : ''}
          </p>
        )}
      </div>
      {onAdd && (
        <Button onClick={onAdd}>
          <PlusIcon size={16} /> {addLabel}
        </Button>
      )}
    </div>
  );
}

// ── TAG INPUT ─────────────────────────────────────────────────────────────────

interface TagInputProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
}

export function TagInput({ tags, onAdd, onRemove, placeholder = 'Ajouter...' }: TagInputProps) {
  const [value, setValue] = React.useState('');

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onAdd(trimmed);
      setValue('');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        <input
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
          placeholder={placeholder}
          style={{ flex: 1, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)', color: '#e2e8f0', padding: '8px 12px', borderRadius: 8, fontSize: 14 }}
        />
        <button
          onClick={handleAdd}
          style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)', padding: '8px 14px', borderRadius: 8, fontWeight: 600, cursor: 'pointer' }}
        >
          +
        </button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tags.map(tag => (
          <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#818cf8', padding: '3px 10px', borderRadius: 9999, fontSize: 12 }}>
            {tag}
            <button onClick={() => onRemove(tag)} style={{ background: 'transparent', color: '#ef4444', cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>×</button>
          </span>
        ))}
      </div>
    </div>
  );
}
