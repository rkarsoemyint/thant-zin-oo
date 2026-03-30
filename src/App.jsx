import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Skills from "./components/Skills";
import Login from "./components/Login";
import Projects from "./components/Projects";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Admin/Dashboard";
import Footer from "./components/Footer";
import ProjectDetail from "./components/ProjectDetail";
import About from './components/About';
import CV from './components/CV'; 
import Contact from './components/Contact';
import AIChatBot from "./components/AIChatBot"; 
import SocialSidebar from "./components/SocialSidebar";
import KanoteBackground from "./components/KanoteBackground";
import TechStack from './components/TechStack';


function AppContent() {
  const location = useLocation();

  
  const isHideLayout = location.pathname.startsWith('/admin') || location.pathname === '/login';

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      
      {!isHideLayout && <KanoteBackground />}
      {!isHideLayout && <Navbar />}
      {!isHideLayout && <SocialSidebar />}

      <Routes>
        {/* --- Main Portfolio Route (Public) --- */}
        <Route path="/" element={
          <>
            <main className="pt-16"> 
              <Hero />
              <About />    
              <Skills />
              <Projects />
              <TechStack />
              <CV />   
              <Contact />    
            </main>
            <Footer />
          </>
        } />

        {/* --- Project Detail Page (Public) --- */}
        <Route path="/project/:id" element={
          <div className="pt-16">
            <ProjectDetail />
            <Footer />
          </div>
        } />

        {/* --- Admin Login --- */}
        <Route path="/login" element={<Login />} />

        {/* --- Protected Admin Dashboard --- */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* 404 Page */}
        <Route path="*" element={
          <div className="h-screen flex items-center justify-center italic text-xl">
            404 - Page Not Found
          </div>
        } />
      </Routes>

     
      {!isHideLayout && <AIChatBot />}
    </div>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;