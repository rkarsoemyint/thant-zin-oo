import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web Design', 'Python', 'React & Node', 'React Native'];

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjects(projectData);
    });

    return () => unsubscribe();
  }, []);

  // Filter Logic
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 px-6 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 underline decoration-blue-500 underline-offset-8">
          My Projects
        </h2>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
  {categories.map((cat) => (
    <button
      key={cat}
      onClick={() => setFilter(cat)}
      className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border-2 ${
        filter === cat 
          ? 'border-blue-600 text-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.3)] bg-transparent' 
          : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 bg-transparent hover:border-blue-400'
      }`}
    >
      {cat}
    </button>
  ))}
</div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-gray-100 dark:border-gray-700 flex flex-col">
              <img 
                src={project.image || "https://via.placeholder.com/400x250"} 
                alt={project.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6 flex flex-col flex-grow">
                <span className="text-xs font-bold text-blue-500 uppercase tracking-wider mb-2">{project.category}</span>
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-auto">
                  <Link 
                    to={`/project/${project.id}`} 
                    className="inline-block w-full text-center bg-gray-900 dark:bg-blue-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                  >
                    အသေးစိတ်
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;