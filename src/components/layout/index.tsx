// ─── LAYOUT : NAVBAR ─────────────────────────────────────────────────────────

import React, { useState } from 'react';
import type { PortfolioSection } from '../../types';
import { NAV_LINKS } from '../../constants';
import { MenuIcon, CloseIcon } from '../icons';
import { Badge } from '../ui';

interface NavbarProps {
  currentSection: PortfolioSection;
  onNavigate: (section: PortfolioSection) => void;
  onAdminClick: () => void;
  available: boolean;
  ownerInitials: string;
  ownerFirstName: string;
}

export function Navbar({ currentSection, onNavigate, onAdminClick, available, ownerInitials, ownerFirstName }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavigate = (section: PortfolioSection) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        background: 'rgba(10,15,30,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(99,102,241,0.2)',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 800, color: 'white',
          }}>
            {ownerInitials}
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9' }}>{ownerFirstName}</span>
        </div>

        {/* Desktop Links */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              style={{
                background: currentSection === link.id ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: currentSection === link.id ? '#818cf8' : '#94a3b8',
                border: currentSection === link.id ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                padding: '6px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                transition: 'all 0.2s',
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}

          {available && <Badge color="green">● Disponible</Badge>}

          <button
            onClick={onAdminClick}
            style={{
              background: 'rgba(99,102,241,0.08)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: '#818cf8',
              padding: '6px 12px',
              borderRadius: 8,
              fontSize: 13,
              cursor: 'pointer',
            }}
          >
            Admin
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="show-mobile"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{ background: 'transparent', color: '#94a3b8', display: 'none', cursor: 'pointer' }}
        >
          {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0,
          background: '#0d1427',
          zIndex: 99,
          padding: '12px 20px 20px',
          borderBottom: '1px solid rgba(99,102,241,0.15)',
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link.id}
              onClick={() => handleNavigate(link.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                color: currentSection === link.id ? '#818cf8' : '#94a3b8',
                padding: '13px 0',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => { onAdminClick(); setMobileOpen(false); }}
            style={{ marginTop: 12, background: 'transparent', color: '#64748b', fontSize: 14, cursor: 'pointer' }}
          >
            Admin →
          </button>
        </div>
      )}
    </>
  );
}

// ─── LAYOUT : FOOTER ──────────────────────────────────────────────────────────

interface FooterProps {
  name: string;
  github: string;
  linkedin: string;
}

export function Footer({ name, github, linkedin }: FooterProps) {
  return (
    <footer style={{
      borderTop: '1px solid rgba(99,102,241,0.1)',
      padding: '24px',
      textAlign: 'center',
      color: '#475569',
      fontSize: 13,
    }}>
      <p>© {new Date().getFullYear()} {name} · Développé avec passion</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
        <a href={github} target="_blank" rel="noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>GitHub</a>
        <a href={linkedin} target="_blank" rel="noreferrer" style={{ color: '#64748b', textDecoration: 'none' }}>LinkedIn</a>
      </div>
    </footer>
  );
}
