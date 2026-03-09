import { prisma } from './prisma';

export async function seedDatabase() {
  const existing = await prisma.profile.count();
  if (existing > 0) return;

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

  await prisma.project.createMany({
    data: [
      { title: 'TrackMatériel', description: "Application de gestion et suivi du matériel d'une organisation.", longDescription: "Application web complète développée avec Symfony.", technologies: ['Symfony', 'PHP', 'MySQL', 'Bootstrap'], github: 'https://github.com/ovvoso/TrackMateriel', demo: '', image: '', featured: true, category: 'Web' },
      { title: 'Gestion Épidémie', description: 'Système de suivi épidémiologique.', longDescription: "Application de santé publique.", technologies: ['PHP 8', 'Doctrine ORM', 'MySQL'], github: 'https://github.com/ovvoso/Gestion_Epidemie', demo: '', image: '', featured: true, category: 'Web' },
      { title: 'Logiciel de Gestion de Stock', description: 'Application desktop complète.', longDescription: "Logiciel desktop C# avec interface graphique.", technologies: ['C#', 'ASP.NET', 'MySQL'], github: 'https://github.com/ovvoso/Logiciel-de-Gestion-de-Stock', demo: '', image: '', featured: true, category: 'Desktop' },
      { title: 'Biblios', description: "Gestion de bibliothèque. (En cours)", longDescription: "Projet en cours.", technologies: ['Symfony', 'PHP', 'MySQL', 'Bootstrap'], github: 'https://github.com/ovvoso/Biblios', demo: '', image: '', featured: false, category: 'Web' },
      { title: 'Spring MVC DITI4', description: 'Application web Spring Boot CRUD.', longDescription: "Application d'entreprise Spring Boot.", technologies: ['Java', 'Spring MVC', 'MySQL'], github: 'https://github.com/ovvoso/Spring-mvc-diti4', demo: '', image: '', featured: false, category: 'Web' },
      { title: 'Gestion Produit', description: 'Application mobile Flutter CRUD.', longDescription: "Application mobile cross-platform Flutter.", technologies: ['Flutter', 'Dart', 'Firebase'], github: 'https://github.com/ovvoso/gestion_produit', demo: '', image: '', featured: false, category: 'Mobile' },
      { title: 'Projet JavaFX — Gestion de Stock', description: 'Application JavaFX pour gérer les produits et stocks.', longDescription: "Application desktop Java/JavaFX.", technologies: ['Java', 'JavaFX', 'MySQL'], github: 'https://github.com/ovvoso/Projet_JavaFX_GestionStock', demo: '', image: '', featured: false, category: 'Desktop' },
      { title: 'Site Quincaillerie Pro', description: 'Site vitrine pour une quincaillerie.', longDescription: "Site vitrine HTML/CSS/JS pur.", technologies: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/ovvoso/Site-Quincaillerie-Pro', demo: '', image: '', featured: false, category: 'Web' },
    ],
  });

  await prisma.experience.createMany({
    data: [
      { title: 'Développeur Web & Designer', company: 'Freelance', period: '2023 – Présent', type: 'Freelance', description: "Réalisation de sites vitrines, maquettes et éléments graphiques.", technologies: ['HTML', 'CSS', 'WordPress', 'Figma', 'Canva'], current: true },
      { title: 'Stagiaire Développeur Web', company: 'Abris suarl (Agence immobilière)', period: '2023', type: 'Stage', description: "Collaboration avec l'équipe marketing pour concevoir un site vitrine.", technologies: ['HTML', 'CSS', 'JavaScript'], current: false },
      { title: 'Master en Ingénierie des Techniques Informatiques', company: "ISI – Institut Supérieur d'Informatique", period: '2024 – En cours', type: 'Formation', description: "Formation avancée en ingénierie informatique.", technologies: [], current: true },
      { title: 'Licence Génie Logiciel', company: 'Université Dakar Bourguiba', period: '2023', type: 'Formation', description: "Fondamentaux du génie logiciel.", technologies: [], current: false },
    ],
  });
}
