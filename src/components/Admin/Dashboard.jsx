import React, { useState } from 'react';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { LayoutDashboard, User, FileText, BarChart3, LogOut, Menu, X } from 'lucide-react';
import AdminPanel from '../AdminPanel';
import SkillsManager from "./SkillsManager";
import AboutManager from "./AboutManager";
import CVManager from "./CVManager";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle

  const handleLogout = () => {
    signOut(auth);
  };

  const navItems = [
    { id: 'projects', label: 'Projects', icon: <LayoutDashboard size={20} /> },
    { id: 'skills', label: 'Skills', icon: <BarChart3 size={20} /> },
    { id: 'about', label: 'About Me', icon: <User size={20} /> },
    { id: 'cv', label: 'CV Details', icon: <FileText size={20} /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      
      {/* Mobile Header (Only shows on small screens) */}
      <div className="md:hidden flex items-center justify-between p-4 bg-gray-900 text-white shadow-lg">
        <h2 className="text-xl font-bold text-blue-400">Admin Hub</h2>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg">
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Sidebar Section */}
      <aside className={`
        ${isSidebarOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-72 bg-gray-900 text-white p-6 space-y-8 shadow-2xl z-50
      `}>
        <h2 className="hidden md:block text-2xl font-bold border-b border-gray-700 pb-4 text-blue-400 italic">Admin Hub</h2>
        
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false); // Close on mobile after click
              }}
              className={`flex items-center gap-3 w-full text-left p-4 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'hover:bg-gray-800 text-gray-400'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={handleLogout} 
          className="md:absolute md:bottom-8 md:w-56 w-full mt-10 bg-red-600/10 text-red-500 border border-red-600/30 p-4 rounded-xl hover:bg-red-600 hover:text-white transition-all font-bold flex items-center justify-center gap-2"
        >
          <LogOut size={20} /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto w-full">
        {/* Header Section */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white capitalize tracking-tight flex items-center gap-2">
              {activeTab} <span className="text-blue-600 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">Manager</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Manage your website content dynamically.</p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl text-[10px] md:text-xs font-mono text-gray-500 border border-gray-200 dark:border-gray-700">
             User: {auth.currentUser?.email}
          </div>
        </header>

        {/* Management Components - Responsive Container */}
        <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-gray-900/50 rounded-3xl border border-gray-200 dark:border-gray-800 p-2 md:p-6 shadow-sm">
            {activeTab === 'projects' && <AdminPanel />}
            {activeTab === 'skills' && <SkillsManager />}
            {activeTab === 'about' && <AboutManager />}
            {activeTab === 'cv' && <CVManager />}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Dashboard;