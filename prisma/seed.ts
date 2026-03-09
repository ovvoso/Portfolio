// ─── SEED — DONNÉES INITIALES ─────────────────────────────────────────────────
// Ce script peuple la base de données avec les données de départ.
// Commande : npx ts-node prisma/seed.ts
// Il ne s'exécute qu'une seule fois (vérifie si déjà peuplé).

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Ne rien faire si déjà peuplé
  const existing = await prisma.profile.count();
  if (existing > 0) {
    console.log('✅ Base déjà peuplée, rien à faire.');
    return;
  }

  // ── Profil ────────────────────────────────────────────────────────────────
  await prisma.profile.create({
    data: {
      name:      'Sow Thierno Maadjou',
      title:     'Full-Stack Developer & Software Engineer',
      bio:       "Développeur logiciel junior passionné, spécialisé en développement web full-stack et applications desktop/mobile. Actuellement en Master en Ingénierie des Techniques Informatiques à l'ISI Dakar.",
      email:     'thiernomaadjous@gmail.com',
      phone:     '+221 77-762-14-99',
      github:    'https://github.com/ovvoso',
      linkedin:  'https://linkedin.com/in/sow-thierno-maadjou-developpeur',
      location:  'Dakar, Sénégal',
      available: true,
    },
  });

  // ── Compétences ───────────────────────────────────────────────────────────
  await prisma.skill.createMany({
    data: [
      { name: 'PHP',        category: 'Langages',          level: 85, color: '#777BB4' },
      { name: 'JavaScript', category: 'Langages',          level: 80, color: '#F7DF1E' },
      { name: 'Java',       category: 'Langages',          level: 75, color: '#ED8B00' },
      { name: 'HTML/CSS',   category: 'Langages',          level: 90, color: '#E34F26' },
      { name: 'Python',     category: 'Langages',          level: 65, color: '#3776AB' },
      { name: 'C#',         category: 'Langages',          level: 70, color: '#239120' },
      { name: 'Symfony',    category: 'Frameworks',        level: 80, color: '#1a1a1a' },
      { name: 'Laravel',    category: 'Frameworks',        level: 70, color: '#FF2D20' },
      { name: 'Flutter',    category: 'Frameworks',        level: 65, color: '#02569B' },
      { name: 'Spring MVC', category: 'Frameworks',        level: 60, color: '#6DB33F' },
      { name: 'ASP.NET',    category: 'Frameworks',        level: 60, color: '#5C2D91' },
      { name: 'JavaFX',     category: 'Frameworks',        level: 65, color: '#ED8B00' },
      { name: 'MySQL',      category: 'Bases de données',  level: 85, color: '#4479A1' },
      { name: 'PostgreSQL', category: 'Bases de données',  level: 75, color: '#336791' },
      { name: 'GitHub',     category: 'Outils',            level: 85, color: '#6e5494' },
      { name: 'Figma',      category: 'Outils',            level: 70, color: '#F24E1E' },
      { name: 'WordPress',  category: 'Outils',            level: 75, color: '#21759B' },
      { name: 'Firebase',   category: 'Outils',            level: 60, color: '#FFCA28' },
    ],
  });

  // ── Projets ───────────────────────────────────────────────────────────────
  await prisma.project.createMany({
    data: [
      {
        title:           'TrackMatériel',
        description:     "Application de gestion et suivi du matériel d'une organisation : disponibilité, gestion des éléments et optimisation des ressources.",
        longDescription: "Application web complète développée avec Symfony permettant aux organisations de suivre en temps réel leur matériel. Fonctionnalités : inventaire, affectation, historique des mouvements.",
        technologies:    ['Symfony', 'PHP', 'MySQL', 'Bootstrap'],
        github:          'https://github.com/ovvoso/TrackMateriel',
        demo: '', image: '', featured: true, category: 'Web',
      },
      {
        title:           'Gestion Épidémie',
        description:     'Système de suivi épidémiologique : gestion des cas par Pays, Zones et Points de surveillance.',
        longDescription: "Application de santé publique. Gestion hiérarchique : pays → zones → points de surveillance. Interface de reporting.",
        technologies:    ['PHP 8', 'Doctrine ORM', 'MySQL'],
        github:          'https://github.com/ovvoso/Gestion_Epidemie',
        demo: '', image: '', featured: true, category: 'Web',
      },
      {
        title:           'Logiciel de Gestion de Stock',
        description:     'Application desktop complète : clients, produits, ventes, niveaux de stock et interface simplifiée.',
        longDescription: "Logiciel desktop C# avec interface graphique. Gestion des clients, produits, ventes et alertes de stock. Génération de rapports.",
        technologies:    ['C#', 'ASP.NET', 'MySQL'],
        github:          'https://github.com/ovvoso/Logiciel-de-Gestion-de-Stock',
        demo: '', image: '', featured: true, category: 'Desktop',
      },
      {
        title:           'Biblios',
        description:     "Gestion de bibliothèque : catalogue, ouvrages, auteurs, éditeurs et système d'accès par rôles. (En cours)",
        longDescription: "Projet en cours. Système complet avec authentification par rôles (admin, bibliothécaire, lecteur), catalogue et système de prêts.",
        technologies:    ['Symfony', 'PHP', 'MySQL', 'Bootstrap'],
        github:          'https://github.com/ovvoso/Biblios',
        demo: '', image: '', featured: false, category: 'Web',
      },
      {
        title:           'Spring MVC DITI4',
        description:     'Application web Spring Boot pour la gestion des personnes avec CRUD complet.',
        longDescription: "Application d'entreprise Spring Boot. CRUD complet, système de recherche, interface responsive. Architecture MVC Java EE.",
        technologies:    ['Java', 'Spring MVC', 'MySQL'],
        github:          'https://github.com/ovvoso/Spring-mvc-diti4',
        demo: '', image: '', featured: false, category: 'Web',
      },
      {
        title:           'Gestion Produit',
        description:     'Application mobile Flutter CRUD : ajouter, modifier, supprimer et afficher des produits.',
        longDescription: "Application mobile cross-platform Flutter. Interface intuitive avec opérations CRUD complètes.",
        technologies:    ['Flutter', 'Dart', 'Firebase'],
        github:          'https://github.com/ovvoso/gestion_produit',
        demo: '', image: '', featured: false, category: 'Mobile',
      },
      {
        title:           'Projet JavaFX — Gestion de Stock',
        description:     'Application JavaFX pour gérer les produits et stocks via une interface graphique ergonomique.',
        longDescription: "Application desktop Java/JavaFX. Dashboard de gestion des stocks, alertes, historique.",
        technologies:    ['Java', 'JavaFX', 'MySQL'],
        github:          'https://github.com/ovvoso/Projet_JavaFX_GestionStock',
        demo: '', image: '', featured: false, category: 'Desktop',
      },
      {
        title:           'Site Quincaillerie Pro',
        description:     'Site vitrine pour une quincaillerie, design sobre et professionnel.',
        longDescription: "Site vitrine HTML/CSS/JS pur. Design responsive, catalogue produits, SEO optimisé.",
        technologies:    ['HTML', 'CSS', 'JavaScript'],
        github:          'https://github.com/ovvoso/Site-Quincaillerie-Pro',
        demo: '', image: '', featured: false, category: 'Web',
      },
    ],
  });

  // ── Expériences ───────────────────────────────────────────────────────────
  await prisma.experience.createMany({
    data: [
      {
        title:        'Développeur Web & Designer',
        company:      'Freelance',
        period:       '2023 – Présent',
        type:         'Freelance',
        description:  "Réalisation de sites vitrines, maquettes et éléments graphiques pour particuliers et petites entreprises. Création de designs sur mesure.",
        technologies: ['HTML', 'CSS', 'WordPress', 'Figma', 'Canva'],
        current:      true,
      },
      {
        title:        'Stagiaire Développeur Web',
        company:      'Abris suarl (Agence immobilière)',
        period:       '2023',
        type:         'Stage',
        description:  "Collaboration avec l'équipe marketing pour concevoir un site vitrine. Participation à la recherche de solutions techniques.",
        technologies: ['HTML', 'CSS', 'JavaScript'],
        current:      false,
      },
      {
        title:        'Master en Ingénierie des Techniques Informatiques',
        company:      "ISI – Institut Supérieur d'Informatique",
        period:       '2024 – En cours',
        type:         'Formation',
        description:  "Formation avancée en ingénierie informatique, architecture logicielle et développement web.",
        technologies: [],
        current:      true,
      },
      {
        title:        'Licence Génie Logiciel',
        company:      'Université Dakar Bourguiba',
        period:       '2023',
        type:         'Formation',
        description:  "Fondamentaux du génie logiciel : algorithmique, bases de données, développement web et desktop.",
        technologies: [],
        current:      false,
      },
    ],
  });

  console.log('✅ Base de données peuplée avec succès !');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
