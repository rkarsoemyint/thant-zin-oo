import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react'; 

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProject(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div className="h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">Loading...</div>;
  if (!project) return <div className="h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">Project not found!</div>;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 py-20 px-6 text-gray-900 dark:text-white transition-colors duration-500">
      <div className="max-w-4xl mx-auto">
        <nav className="flex items-center space-x-2 text-sm mb-8 text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-blue-600 flex items-center">
                <Icons.Home size={16} className="mr-1" /> Home
            </Link>
            <Icons.ChevronRight size={14} />
            <span className="text-blue-600 font-bold truncate max-w-[200px]">{project.title}</span>
        </nav>

        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        
        <div className="rounded-2xl overflow-hidden shadow-xl mb-10 border border-gray-100 dark:border-gray-800">
          <img 
            src={project.image && project.image.startsWith('http') ? project.image : "https://via.placeholder.com/800x450?text=No+Image+Found"} 
            alt={project.title} 
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-bold text-blue-600">Project Overview</h3>
            <p className="leading-relaxed">{project.description}</p>
            
            <h3 className="text-xl font-bold">Technologies:</h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">{tech}</span>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 h-fit">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Icons.Tag size={18} /> <span>{project.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icons.Calendar size={18} /> <span>{project.createdAt?.toDate ? project.createdAt.toDate().toLocaleDateString() : "No Date"}</span>
              </div>
              <hr className="dark:border-gray-800" />
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 w-full bg-black text-white py-2 rounded-lg">
                  <Icons.Code size={18} /> Github
                </a>
              )}
              {project.liveLink && (
  <a 
    href={project.liveLink} 
    target="_blank" 
    rel="noreferrer" 
    className="flex items-center justify-center gap-2 w-full bg-blue-600 text-white py-2.5 rounded-xl font-bold hover:bg-blue-700 transition"
  >
    <Icons.ExternalLink size={18} /> Live Demo
  </a>
)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;