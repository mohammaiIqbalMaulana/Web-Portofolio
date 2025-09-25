import React from 'react';
import { HeaderSection } from '../sections/HeaderSection';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsSection } from '../sections/SkillsSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ContactSection } from '../sections/ContactSection';
import { FooterSection } from '../sections/FooterSection';

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900 text-secondary-900 dark:text-secondary-100 transition-colors duration-300">
      <HeaderSection />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        {children}
      </main>
      <FooterSection />
    </div>
  );
};
