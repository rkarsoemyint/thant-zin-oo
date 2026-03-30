import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  deleteDoc, 
  doc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import * as Icons from 'lucide-react'; 
import SkillsManager from './Admin/SkillsManager';

const AdminPanel = () => {
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    title: '', category: 'Web Design', description: '', githubLink: '', liveLink: '', techStack: '', image: ''
  });

  const fetchProjects = async () => {
    try {
      const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (error) {
      console.error("Error fetching: ", error);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const techArray = project.techStack.split(',').map(item => item.trim());
      await addDoc(collection(db, "projects"), {
        ...project,
        techStack: techArray,
        createdAt: serverTimestamp()
      });
      alert("Project Added Successfully!");
      setProject({ title: '', category: 'Web Design', description: '', githubLink: '', liveLink: '', techStack: '', image: '' });
      fetchProjects();
    } catch (error) {
      alert("Error adding project!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ဒီပရောဂျက်ကို ဖျက်မှာ သေချာပါသလား?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        fetchProjects();
      } catch (error) {
        alert("Delete failed!");
      }
    }
  };

  return (
    <div className="p-6 mt-16 max-w-4xl mx-auto space-y-10 text-white">
      
      {/* --- FORM SECTION --- */}
      <div className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-400">
          <Icons.PlusCircle /> Add New Project
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Project Title" className="p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" 
            onChange={(e) => setProject({...project, title: e.target.value})} value={project.title} required />
          
          <select className="p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" 
            onChange={(e) => setProject({...project, category: e.target.value})} value={project.category}>
            <option value="Web Design">Web Design</option>
            <option value="Python">Python</option>
            <option value="React & Node">React & Node</option>
            <option value="React Native">React Native</option>
            <option value="Animation">Animation</option>
          </select>

          <input type="text" placeholder="GitHub Link" className="p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" 
            onChange={(e) => setProject({...project, githubLink: e.target.value})} value={project.githubLink} />
          
          <input type="text" placeholder="Live Demo Link" className="p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" 
            onChange={(e) => setProject({...project, liveLink: e.target.value})} value={project.liveLink} />

          <input type="text" placeholder="Image URL" className="md:col-span-2 p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" 
            onChange={(e) => setProject({...project, image: e.target.value})} value={project.image} />

          <textarea placeholder="Description" className="md:col-span-2 p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" rows="3"
            onChange={(e) => setProject({...project, description: e.target.value})} value={project.description}></textarea>

          <input type="text" placeholder="Tech Stack (comma separated)" className="md:col-span-2 p-2.5 bg-gray-900 border border-gray-700 rounded w-full text-white" 
            onChange={(e) => setProject({...project, techStack: e.target.value})} value={project.techStack} />

          <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-bold transition-all text-white">
            Upload Project
          </button>
        </form>
      </div>

      {/* --- LIST SECTION (ဖျက်ဖို့နေရာ) --- */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden shadow-xl">
        <div className="p-4 border-b border-gray-700 bg-gray-800/50 flex items-center gap-2 font-bold text-gray-200">
          <Icons.List size={20} className="text-blue-400" /> Existing Projects ({projects.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900 text-gray-400 text-sm">
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="p-4 font-medium text-gray-200">{p.title}</td>
                  <td className="p-4 text-sm text-gray-400">{p.category}</td>
                  <td className="p-4 text-center">
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Icons.Trash2 size={18} />
                      </button>
                  </td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="3" className="p-10 text-center text-gray-500 italic">No projects found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminPanel;