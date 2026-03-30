import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: '', category: 'Web Design', description: '', techStack: ''
  });

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "projects"), {
        ...formData,
        techStack: formData.techStack.split(','),
        createdAt: serverTimestamp()
      });
      alert("Project Added Successfully!");
      setFormData({ title: '', category: 'Web Design', description: '', techStack: '' });
      fetchProjects();
    } catch (err) { alert("Error!"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ဖျက်မှာ သေချာပါသလား?")) {
      await deleteDoc(doc(db, "projects", id));
      fetchProjects();
    }
  };

  return (
    <div className="w-full space-y-10 pb-20">
      {/* Upload Form */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
        <h3 className="text-lg font-bold mb-4 text-blue-400">Add New Project</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Project Title" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <select className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="Web Design">Web Design</option>
            <option value="React & Node">React & Node</option>
            <option value="Animation">Animation</option>
          </select>
          <textarea placeholder="Description" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <input type="text" placeholder="Tech Stack (React, CSS)" className="w-full p-2 bg-gray-900 border border-gray-700 rounded text-white" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} />
          <button type="submit" className="w-full bg-blue-600 py-2 rounded font-bold">Upload Project</button>
        </form>
      </div>

      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700 font-bold text-gray-300">
          Existing Projects ({projects.length})
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400 text-sm">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {projects.map(p => (
              <tr key={p.id} className="hover:bg-gray-700/30">
                <td className="p-3 text-white">{p.title}</td>
                <td className="p-3 text-center">
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400">
                    <Icons.Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManager;