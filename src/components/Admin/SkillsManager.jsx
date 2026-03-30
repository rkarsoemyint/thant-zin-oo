import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { 
  collection, addDoc, getDocs, deleteDoc, doc, 
  serverTimestamp, query, orderBy 
} from 'firebase/firestore';
import * as Icons from 'lucide-react';

const SkillsManager = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    percentage: 80,
    category: 'Frontend' 
  });

  const fetchSkills = async () => {
    try {
      const q = query(collection(db, "skills"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      setSkills(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "skills"), {
        ...formData,
        percentage: Number(formData.percentage),
        createdAt: serverTimestamp()
      });
      alert("Skill Added!");
      setFormData({ name: '', percentage: 80, category: 'Frontend' });
      fetchSkills();
    } catch (err) { alert("Error adding skill"); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("ဒီ Skill ကို ဖျက်မှာ သေချာပါသလား?")) {
      await deleteDoc(doc(db, "skills", id));
      fetchSkills();
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Skill Form */}
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-blue-400 flex items-center gap-2">
          <Icons.Cpu size={20} /> Add New Skill
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            type="text" placeholder="Skill Name (e.g. React)" 
            className="p-2.5 bg-gray-900 border border-gray-700 rounded text-white"
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required 
          />
          <input 
            type="number" placeholder="Percentage (0-100)" 
            className="p-2.5 bg-gray-900 border border-gray-700 rounded text-white"
            value={formData.percentage} onChange={e => setFormData({...formData, percentage: e.target.value})} required 
          />
          <select 
            className="p-2.5 bg-gray-900 border border-gray-700 rounded text-white"
            value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
          >
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Design">Design</option>
            <option value="Animation">Animation</option>
            <option value="Tools">Tools</option>
          </select>
          <button type="submit" className="md:col-span-3 bg-blue-600 hover:bg-blue-700 py-2.5 rounded-lg font-bold transition-all">
            Add Skill
          </button>
        </form>
      </div>

      {/* Skills Table */}
      <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden shadow-lg">
        <div className="p-4 border-b border-gray-700 font-bold flex items-center gap-2">
          <Icons.BarChart3 size={20} className="text-blue-400" /> Existing Skills ({skills.length})
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-900 text-gray-400 text-sm">
            <tr>
              <th className="p-4">Skill Name</th>
              <th className="p-4">Level (%)</th>
              <th className="p-4">Category</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700 text-gray-200">
            {skills.map(s => (
              <tr key={s.id} className="hover:bg-gray-700/30 transition-colors text-sm">
                <td className="p-4 font-medium">{s.name}</td>
                <td className="p-4">
                   <div className="w-full bg-gray-700 rounded-full h-2 max-w-[100px]">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${s.percentage}%` }}></div>
                   </div>
                   <span className="text-xs ml-1">{s.percentage}%</span>
                </td>
                <td className="p-4 text-xs">
                  <span className="px-2 py-1 bg-blue-900/40 text-blue-400 rounded-md border border-blue-800/50">{s.category}</span>
                </td>
                <td className="p-4 text-center">
                  <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg">
                    <Icons.Trash2 size={16} />
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

export default SkillsManager;