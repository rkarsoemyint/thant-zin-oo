import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', 
    category: 'Web Design', 
    description: '', 
    techStack: '',
    githubLink: '', 
    liveLink: '',   
    imageUrl: ''    
  });

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      title: project.title || '',
      category: project.category || 'Web Design',
      description: project.description || '',
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : (project.techStack || ''),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      imageUrl: project.imageUrl || ''
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        techStack: formData.techStack.split(',').map(s => s.trim()),
        updatedAt: serverTimestamp()
      };

      if (editingId) {
        await updateDoc(doc(db, "projects", editingId), projectData);
        alert("Project Updated Successfully!");
      } else {
        await addDoc(collection(db, "projects"), {
          ...projectData,
          createdAt: serverTimestamp()
        });
        alert("Project Added Successfully!");
      }

      setFormData({ title: '', category: 'Web Design', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' });
      setEditingId(null);
      fetchProjects();
    } catch (err) { 
      console.error(err);
      alert("Error processing request!"); 
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ဖျက်မှာ သေချာပါသလား?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', category: 'Web Design', description: '', techStack: '', githubLink: '', liveLink: '', imageUrl: '' });
  };

  return (
    <div className="w-full space-y-10 pb-20">
      {/* Upload/Edit Form */}
      <div className={`p-6 rounded-xl border transition-all ${editingId ? 'bg-blue-900/20 border-blue-500' : 'bg-gray-800/50 border-gray-700'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-blue-400">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h3>
          {editingId && (
            <button onClick={cancelEdit} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
              <Icons.X size={14} /> Cancel Edit
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Project Title" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            
           
            <select className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-blue-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Web Design">Web Design</option>
              <option value="React & Node">React & Node</option>
              <option value="Next.js">Next.js</option>
              <option value="Python Django">Python Django</option>
              <option value="PHP">PHP</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="url" placeholder="GitHub Link (https://...)" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-blue-500" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
            
            <input type="url" placeholder="Live Demo Link (https://...)" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-blue-500" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} />
          </div>

          <input type="text" placeholder="Image URL (Direct link to project image)" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-blue-500" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />

          <textarea placeholder="Description" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white h-32 outline-none focus:border-blue-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          
          <input type="text" placeholder="Tech Stack (React, CSS, Firebase)" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white outline-none focus:border-blue-500" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
          
          <button type="submit" className={`w-full py-2 rounded font-bold transition-colors ${editingId ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {editingId ? 'Update Project' : 'Upload Project'}
          </button>
        </form>
      </div>

      {/* Project Table */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-gray-700 font-bold text-gray-300 bg-gray-900/50">
          Existing Projects ({projects.length})
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900 text-gray-400 text-sm">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.map(p => (
                <tr key={p.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="p-3 text-white font-medium">{p.title}</td>
                  <td className="p-3 text-gray-400 text-sm">{p.category}</td>
                  <td className="p-3 text-center flex justify-center gap-4">
                    <button onClick={() => handleEdit(p)} className="text-blue-400 hover:text-blue-300 p-1">
                      <Icons.Edit3 size={18} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400 p-1">
                      <Icons.Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
