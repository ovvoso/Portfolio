// ─── APP : ORCHESTRATEUR PRINCIPAL ───────────────────────────────────────────
// Ce fichier ne contient QUE de l'orchestration.
// Aucune logique métier ici — tout est délégué aux hooks et composants.
// Principe : "thin controller, fat model"

import { useState } from "react";
import type { AppView, PortfolioSection, AdminSection } from "./types";
import { usePortfolioData } from "./hooks/usePortfolioData";
import { useNotification } from "./hooks/useNotification";
import { checkAdminPassword } from "./utils/auth";

// Layout
import { Navbar, Footer } from "./components/layout";
// Sections portfolio
import { HeroSection, SkillsSection, ProjectsSection, ExperienceSection, ContactSection } from "./components/sections";
// Pages admin
import { AdminProjects, AdminSkills, AdminExperience, AdminProfile } from "./pages/admin";
import { AdminSidebar } from "./components/admin";
// Pages auth
import { LoginPage } from "./pages/portfolio/LoginPage";
// UI
import { Toast } from "./components/ui";

export default function App() {
  // ── État de navigation ──────────────────────────────────────────────────
  const [appView, setAppView] = useState<AppView>("portfolio");
  const [portfolioSection, setPortfolioSection] = useState<PortfolioSection>("home");
  const [adminSection, setAdminSection] = useState<AdminSection>("projects");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  // ── Données & notifications ─────────────────────────────────────────────
  const portfolioData = usePortfolioData();
  const { notification, notify } = useNotification();

  // ── Handlers d'authentification ─────────────────────────────────────────
  const handleLogin = (password: string): boolean => {
    if (checkAdminPassword(password)) {
      setIsAdminAuthenticated(true);
      setAppView("admin");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setAppView("portfolio");
  };

  // ── Calculs dérivés pour le Hero ────────────────────────────────────────
  const { data, featuredProjects, skillsByCategory } = portfolioData;
  const ownerInitials = data.profile.name.split(" ").map(n => n[0]).slice(0, 2).join("");
  const ownerFirstName = data.profile.name.split(" ")[0];
  const categoryCount = Object.keys(skillsByCategory).length;

  // ── Rendu ────────────────────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: "100vh", background: "#0a0f1e", color: "#e2e8f0" }}>

      {/* Toast notification globale */}
      {notification && <Toast message={notification.message} type={notification.type} />}

      {/* ── VUE PORTFOLIO ────────────────────────────────────────────────── */}
      {appView === "portfolio" && (
        <>
          <Navbar
            currentSection={portfolioSection}
            onNavigate={setPortfolioSection}
            onAdminClick={() => setAppView("login")}
            available={data.profile.available}
            ownerInitials={ownerInitials}
            ownerFirstName={ownerFirstName}
          />
          <main style={{ paddingTop: 64 }}>
            {portfolioSection === "home" && (
              <HeroSection
                profile={data.profile}
                featuredProjects={featuredProjects}
                projectCount={data.projects.length}
                skillCount={data.skills.length}
                categoryCount={categoryCount}
                onNavigate={setPortfolioSection}
              />
            )}
            {portfolioSection === "skills" && (
              <SkillsSection skills={data.skills} />
            )}
            {portfolioSection === "projects" && (
              <ProjectsSection projects={data.projects} />
            )}
            {portfolioSection === "experience" && (
              <ExperienceSection experiences={data.experiences} />
            )}
            {portfolioSection === "contact" && (
              <ContactSection profile={data.profile} />
            )}
          </main>
          <Footer
            name={data.profile.name}
            github={data.profile.github}
            linkedin={data.profile.linkedin}
          />
        </>
      )}

      {/* ── VUE LOGIN ────────────────────────────────────────────────────── */}
      {appView === "login" && (
        <LoginPage
          onLogin={handleLogin}
          onBack={() => setAppView("portfolio")}
        />
      )}

      {/* ── VUE ADMIN ────────────────────────────────────────────────────── */}
      {appView === "admin" && isAdminAuthenticated && (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          <AdminSidebar
            current={adminSection}
            onNavigate={setAdminSection}
            onViewPortfolio={handleLogout}
            ownerInitials={ownerInitials}
          />
          <main style={{ marginLeft: 240, flex: 1, padding: 32 }}>
            {adminSection === "projects" && (
              <AdminProjects
                projects={data.projects}
                onAdd={portfolioData.addProject}
                onUpdate={portfolioData.updateProject}
                onDelete={portfolioData.deleteProject}
                notify={notify}
              />
            )}
            {adminSection === "skills" && (
              <AdminSkills
                skills={data.skills}
                onAdd={portfolioData.addSkill}
                onUpdate={portfolioData.updateSkill}
                onDelete={portfolioData.deleteSkill}
                notify={notify}
              />
            )}
            {adminSection === "experience" && (
              <AdminExperience
                experiences={data.experiences}
                onAdd={portfolioData.addExperience}
                onUpdate={portfolioData.updateExperience}
                onDelete={portfolioData.deleteExperience}
                notify={notify}
              />
            )}
            {adminSection === "profile" && (
              <AdminProfile
                profile={data.profile}
                onUpdate={portfolioData.updateProfile}
                notify={notify}
              />
            )}
          </main>
        </div>
      )}

      {/* CSS global injecté */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', system-ui, sans-serif; background: #0a0f1e; color: #e2e8f0; -webkit-font-smoothing: antialiased; }
        button { cursor: pointer; border: none; font-family: inherit; }
        input, textarea, select { font-family: inherit; outline: none; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0f1e; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        .animate-fadeIn  { animation: fadeIn  0.3s ease; }
        .animate-slideUp { animation: slideUp 0.5s ease; }
        .animate-pulse   { animation: pulse   2s infinite; }
        .gradient-text { background: linear-gradient(135deg, #6366f1, #8b5cf6, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        @media (max-width: 768px) { .hide-mobile { display: none !important; } .show-mobile { display: flex !important; } }
        @media (min-width: 769px) { .hide-desktop { display: none !important; } }
      `}</style>
    </div>
  );
}
