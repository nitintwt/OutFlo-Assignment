import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, title, subtitle, currentPage, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        title={title} 
        subtitle={subtitle}
        currentPage={currentPage!}
        onNavigate={onNavigate!}
      />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;