
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from 'lucide-react';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const navigationLinks = [
    { name: 'Dashboard', path: '/' },
    { name: 'Clients', path: '/clients' },
    { name: 'Programs', path: '/programs' },
    { name: 'Enroll Clients', path: '/enroll' },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-0 left-0 z-40 p-4 md:hidden">
        <button
          onClick={toggleSidebar}
          className="rounded-md bg-health-teal p-2 text-white focus:outline-none"
        >
          <MenuIcon size={24} />
        </button>
      </div>

      {/* Sidebar for mobile (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform bg-white transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-health-teal rounded-md flex items-center justify-center">
                <span className="text-white font-semibold">HC</span>
              </div>
              <h1 className="text-xl font-bold text-health-teal">Health Compass</h1>
            </div>
            <button className="md:hidden" onClick={toggleSidebar}>
              <XIcon size={24} className="text-gray-500" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "sidebar-item",
                  location.pathname === link.path ? "active" : ""
                )}
              >
                <span>{link.name}</span>
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-health-blue flex items-center justify-center text-white">
                <span>Dr</span>
              </div>
              <div>
                <p className="text-sm font-medium">Doctor Account</p>
                <p className="text-xs text-gray-500">Healthcare Provider</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6">
          <h1 className="text-xl font-semibold text-gray-800">Health Information System</h1>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-3 px-6">
          <p className="text-sm text-center text-gray-500">© 2025 Health Compass - CEMA Internship Task</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;