# Portfolio — Sow Thierno Maadjou
> Architecture Next.js 14 · TypeScript · Tailwind CSS

---

## Structure du projet

```
src/
├── types/
│   └── index.ts              # ① Source de vérité : toutes les interfaces TypeScript
│
├── constants/
│   └── index.ts              # ② Toutes les valeurs "magiques" centralisées
│
├── data/
│   └── initialData.ts        # ③ Données de départ (sera remplacé par DB en prod)
│
├── utils/
│   ├── storage.ts            # ④ Couche de persistance abstraite
│   └── auth.ts               # ⑤ Logique d'authentification isolée
│
├── hooks/
│   ├── usePortfolioData.ts   # ⑥ Hook métier central (CRUD + sélecteurs)
│   └── useNotification.ts    # ⑦ Hook UI pour les toasts
│
├── styles/
│   └── globals.css           # ⑧ Design tokens CSS (variables, animations)
│
├── components/
│   ├── icons/index.tsx       # ⑨ Toutes les icônes SVG isolées
│   ├── ui/
│   │   ├── index.tsx         # ⑩ Composants UI réutilisables (Button, Badge, Input...)
│   │   └── Modal.tsx         # ⑪ Composant Modal
│   ├── layout/index.tsx      # ⑫ Navbar + Footer
│   ├── sections/index.tsx    # ⑬ Sections portfolio public (Hero, Skills, Projects...)
│   └── admin/index.tsx       # ⑭ Composants admin (Sidebar, TagInput, Header)
│
├── pages/
│   ├── portfolio/
│   │   └── LoginPage.tsx     # ⑮ Page de connexion admin
│   └── admin/
│       └── index.tsx         # ⑯ Pages admin (Projects, Skills, Experience, Profile)
│
└── App.tsx                   # ⑰ Orchestrateur — AUCUNE logique métier ici
```

---

## Principes d'architecture

### 1. Séparation des responsabilités (SoC)
- **Types** : uniquement des interfaces
- **Hooks** : uniquement de la logique
- **Composants UI** : uniquement du rendu
- **Pages** : orchestration locale
- **App.tsx** : orchestration globale

### 2. Smart hook, dumb components
Les composants ne manipulent JAMAIS les données directement.
Ils appellent des fonctions reçues en props.

```typescript
// ✅ Correct
<AdminProjects
  projects={data.projects}
  onAdd={portfolioData.addProject}    // délégué au hook
  onDelete={portfolioData.deleteProject}
/>

// ❌ Incorrect
function AdminProjects() {
  const [projects, setProjects] = useState(...)  // logique dans le composant
}
```

### 3. Source unique de vérité
- Types : `src/types/index.ts`
- Constantes : `src/constants/index.ts`
- Données : `src/data/initialData.ts`
- État : `usePortfolioData` hook

### 4. Couche d'abstraction pour la persistance
`src/utils/storage.ts` expose `loadPortfolioData()` et `savePortfolioData()`.
Pour migrer vers une vraie DB, on ne modifie QUE ce fichier.

---

## Migration vers Next.js 14 (instructions pour Claude Code)

### Étape 1 — Initialisation
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app
cd portfolio
npm install prisma @prisma/client next-auth
```

### Étape 2 — Copier les fichiers
Copier tel quel dans `src/` :
- `types/`, `constants/`, `data/`, `utils/`, `hooks/`
- `components/` (adapter les imports)
- `styles/globals.css` → fusionner avec le globals.css Next.js

### Étape 3 — Remplacer storage.ts
```typescript
// src/utils/storage.ts — version Next.js
export async function loadPortfolioData(): Promise<PortfolioData> {
  const res = await fetch('/api/portfolio');
  return res.json();
}

export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await fetch('/api/portfolio', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
```

### Étape 4 — Créer les routes API
```
src/app/api/
├── portfolio/
│   └── route.ts        # GET, PUT
├── projects/
│   ├── route.ts        # GET, POST
│   └── [id]/route.ts   # PUT, DELETE
├── skills/
│   └── ...
└── experiences/
    └── ...
```

### Étape 5 — Remplacer l'auth
```bash
npm install next-auth bcryptjs
```
Remplacer `src/utils/auth.ts` par NextAuth.js avec credentials provider.

### Étape 6 — Base de données (Prisma + PostgreSQL)
```bash
npx prisma init
# Définir le schéma dans prisma/schema.prisma
# Modèles : Profile, Project, Skill, Experience
npx prisma migrate dev
```

### Étape 7 — Déploiement Vercel
```bash
vercel --prod
# Variables d'environnement Vercel :
# DATABASE_URL, NEXTAUTH_SECRET, NEXTAUTH_URL
```

---

## Commandes de développement

```bash
# Installer les dépendances
npm install

# Développement
npm run dev

# Build production
npm run build

# Linter
npm run lint

# Vérification TypeScript
npx tsc --noEmit
```

---

## Évolutions prévues

- [ ] Blog technique (MDX)
- [ ] Thème clair/sombre (next-themes)
- [ ] Témoignages clients
- [ ] Galerie de screenshots projets
- [ ] Mode multilingue (FR/EN)
- [ ] Sitemap automatique (next-sitemap)
- [ ] Analytics (Vercel Analytics)

---

## Mot de passe admin par défaut
`admin2024` → À changer dans `src/constants/index.ts` avant le déploiement.
En production : utiliser une variable d'environnement `ADMIN_PASSWORD`.
