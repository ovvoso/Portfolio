// ─── COMPOSANTS UI RÉUTILISABLES ──────────────────────────────────────────────
// Composants "dumb" : aucune logique métier, uniquement du rendu.
// Chaque composant a une interface claire (props typées).
// Dans Next.js : ces composants iront dans src/components/ui/

import React, { CSSProperties } from 'react';

// ── BUTTON ────────────────────────────────────────────────────────────────────

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit';
}

const BUTTON_STYLES: Record<string, CSSProperties> = {
  primary: { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', border: 'none' },
  outline: { background: 'transparent', color: '#818cf8', border: '1px solid rgba(99,102,241,0.35)' },
  ghost:   { background: 'transparent', color: '#64748b', border: '1px solid rgba(255,255,255,0.08)' },
  danger:  { background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.3)' },
};

const BUTTON_SIZES: Record<string, CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: 13, borderRadius: 8 },
  md: { padding: '10px 20px', fontSize: 14, borderRadius: 10 },
  lg: { padding: '13px 28px', fontSize: 15, borderRadius: 12 },
};

export function Button({ children, onClick, variant = 'primary', size = 'md', fullWidth, disabled, type = 'button' }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        width: fullWidth ? '100%' : undefined,
        whiteSpace: 'nowrap',
        ...BUTTON_STYLES[variant],
        ...BUTTON_SIZES[size],
      }}
    >
      {children}
    </button>
  );
}

// ── ICON BUTTON ───────────────────────────────────────────────────────────────

interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  color?: string;
  title?: string;
}

export function IconButton({ children, onClick, color = '#94a3b8', title }: IconButtonProps) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        color,
        padding: 6,
        borderRadius: 7,
        transition: 'all 0.15s ease',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}

// ── BADGE ─────────────────────────────────────────────────────────────────────

interface BadgeProps {
  children: React.ReactNode;
  color?: 'indigo' | 'green' | 'yellow' | 'blue' | 'gray';
}

const BADGE_COLORS = {
  indigo: { bg: 'rgba(99,102,241,0.15)',  border: 'rgba(99,102,241,0.3)',  text: '#818cf8' },
  green:  { bg: 'rgba(16,185,129,0.15)',  border: 'rgba(16,185,129,0.3)',  text: '#34d399' },
  yellow: { bg: 'rgba(245,158,11,0.15)',  border: 'rgba(245,158,11,0.3)',  text: '#fbbf24' },
  blue:   { bg: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.3)',  text: '#60a5fa' },
  gray:   { bg: 'rgba(100,116,139,0.15)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8' },
};

export function Badge({ children, color = 'indigo' }: BadgeProps) {
  const c = BADGE_COLORS[color];
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      padding: '3px 8px',
      borderRadius: 9999,
      fontSize: 11,
      fontWeight: 600,
    }}>
      {children}
    </span>
  );
}

// ── TECH TAG ──────────────────────────────────────────────────────────────────

export function TechTag({ name }: { name: string }) {
  return (
    <span style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
      color: '#64748b',
      padding: '3px 8px',
      borderRadius: 6,
      fontSize: 11,
    }}>
      {name}
    </span>
  );
}

// ── REMOVABLE TAG ─────────────────────────────────────────────────────────────

export function RemovableTag({ name, onRemove }: { name: string; onRemove: () => void }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      background: 'rgba(99,102,241,0.15)',
      border: '1px solid rgba(99,102,241,0.3)',
      color: '#818cf8',
      padding: '3px 10px',
      borderRadius: 9999,
      fontSize: 12,
    }}>
      {name}
      <button
        onClick={onRemove}
        style={{ background: 'transparent', color: '#ef4444', fontWeight: 700, lineHeight: 1, cursor: 'pointer' }}
      >
        ×
      </button>
    </span>
  );
}

// ── CARD ──────────────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  hoverable?: boolean;
  style?: CSSProperties;
}

export function Card({ children, hoverable, style }: CardProps) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      style={{
        background: 'rgba(15,23,42,0.9)',
        border: hovered ? '1px solid rgba(99,102,241,0.4)' : '1px solid rgba(99,102,241,0.15)',
        borderRadius: 16,
        padding: 24,
        transition: 'all 0.25s ease',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// ── INPUT ─────────────────────────────────────────────────────────────────────

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  type?: string;
}

export function Input({ value, onChange, placeholder, onKeyDown, type = 'text' }: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(99,102,241,0.2)',
        color: '#e2e8f0',
        padding: '10px 14px',
        borderRadius: 8,
        fontSize: 14,
      }}
    />
  );
}

// ── TEXTAREA ──────────────────────────────────────────────────────────────────

interface TextareaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
}

export function Textarea({ value, onChange, placeholder, rows = 3 }: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      style={{
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(99,102,241,0.2)',
        color: '#e2e8f0',
        padding: '10px 14px',
        borderRadius: 8,
        fontSize: 14,
        resize: 'vertical',
      }}
    />
  );
}

// ── SELECT ────────────────────────────────────────────────────────────────────

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export function Select({ value, onChange, children }: SelectProps) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        width: '100%',
        background: '#0d1427',
        border: '1px solid rgba(99,102,241,0.2)',
        color: '#e2e8f0',
        padding: '10px 14px',
        borderRadius: 8,
        fontSize: 14,
        cursor: 'pointer',
      }}
    >
      {children}
    </select>
  );
}

// ── FORM FIELD ────────────────────────────────────────────────────────────────

export function FormField({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div>
      {label && (
        <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#94a3b8', marginBottom: 6 }}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

// ── SECTION TITLE ─────────────────────────────────────────────────────────────

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, color: '#f1f5f9' }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#64748b', fontSize: 15, marginTop: 6 }}>{subtitle}</p>}
    </div>
  );
}

// ── TOGGLE BUTTON GROUP ───────────────────────────────────────────────────────

interface ToggleGroupProps {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export function ToggleGroup({ options, value, onChange }: ToggleGroupProps) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          style={{
            background: value === opt ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent',
            color: value === opt ? 'white' : '#94a3b8',
            border: value === opt ? 'none' : '1px solid rgba(99,102,241,0.2)',
            padding: '5px 12px',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ── NOTIFICATION TOAST ────────────────────────────────────────────────────────

interface ToastProps {
  message: string;
  type: 'success' | 'error';
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div
      className="animate-fadeIn"
      style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 9999,
        background: type === 'success' ? '#10b981' : '#ef4444',
        color: 'white',
        padding: '12px 20px',
        borderRadius: 10,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        fontSize: 14,
        fontWeight: 500,
      }}
    >
      {message}
    </div>
  );
}
