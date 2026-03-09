// ─── MODAL ────────────────────────────────────────────────────────────────────

import React from 'react';
import { Button } from './index';
import { CloseIcon } from '../icons';

interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: () => void;
  children: React.ReactNode;
}

export function Modal({ title, onClose, onSave, children }: ModalProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backdropFilter: 'blur(4px)',
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="animate-slideUp"
        style={{
          background: '#0d1427',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: 18,
          width: '100%',
          maxWidth: 540,
          maxHeight: '90vh',
          overflow: 'auto',
        }}
      >
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 24px',
          borderBottom: '1px solid rgba(99,102,241,0.1)',
        }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9' }}>{title}</h3>
          <button
            onClick={onClose}
            style={{ background: 'transparent', color: '#64748b', cursor: 'pointer' }}
          >
            <CloseIcon size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {children}
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'flex-end',
          padding: '16px 24px',
          borderTop: '1px solid rgba(99,102,241,0.1)',
        }}>
          <Button variant="ghost" onClick={onClose}>Annuler</Button>
          <Button variant="primary" onClick={onSave}>Sauvegarder</Button>
        </div>
      </div>
    </div>
  );
}
