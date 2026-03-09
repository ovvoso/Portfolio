// ─── PAGE : CONNEXION ADMIN ───────────────────────────────────────────────────

import React, { useState } from 'react';
import { ShieldIcon, EyeIcon, EyeOffIcon } from '../../components/icons';

interface LoginPageProps {
  onLogin: (password: string) => boolean;
  onBack: () => void;
}

export function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const ok = onLogin(password);
    if (!ok) {
      setError('Mot de passe incorrect.');
      setPassword('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div
        className="animate-slideUp"
        style={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, padding: 40, width: '100%', maxWidth: 420 }}
      >
        {/* Icône */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ width: 56, height: 56, borderRadius: 14, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: 'white' }}>
            <ShieldIcon size={26} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#f1f5f9' }}>Accès Admin</h2>
          <p style={{ fontSize: 14, color: '#64748b', marginTop: 6 }}>Entrez votre mot de passe pour continuer</p>
        </div>

        {/* Champ mot de passe */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mot de passe"
            value={password}
            onChange={e => { setPassword(e.target.value); setError(''); }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)', color: '#e2e8f0', padding: '12px 44px 12px 16px', borderRadius: 10, fontSize: 15 }}
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'transparent', color: '#64748b', cursor: 'pointer' }}
          >
            {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
          </button>
        </div>

        {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 8 }}>{error}</p>}

        {/* Bouton */}
        <button
          onClick={handleSubmit}
          style={{ width: '100%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: 'white', padding: 13, borderRadius: 10, fontSize: 15, fontWeight: 600, marginTop: 8, cursor: 'pointer' }}
        >
          Connexion
        </button>

        <button
          onClick={onBack}
          style={{ width: '100%', background: 'transparent', color: '#64748b', marginTop: 12, fontSize: 14, padding: 8, cursor: 'pointer' }}
        >
          ← Retour au portfolio
        </button>

        <p style={{ textAlign: 'center', color: '#475569', fontSize: 12, marginTop: 16 }}>
          Mot de passe par défaut : <code style={{ color: '#818cf8' }}>admin2024</code>
        </p>
      </div>
    </div>
  );
}
