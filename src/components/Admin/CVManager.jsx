import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const CVManager = () => {
  const [loading, setLoading] = useState(true);
  const [cvData, setCvData] = useState({
    objective: '',
    phone: '',
    email: '',
    github: '',
    cvLink: '',
    education: []
  });

  useEffect(() => {
    const fetchCV = async () => {
      const docSnap = await getDoc(doc(db, "cv", "main"));
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCvData({
          ...data,
          education: data.education || [] 
        });
      }
      setLoading(false);
    };
    fetchCV();
  }, []);

  const addEducation = () => {
    setCvData({
      ...cvData,
      education: [...cvData.education, { degree: '', school: '', year: '', status: '' }]
    });
  };

  const removeEducation = (index) => {
    const updatedEdu = cvData.education.filter((_, i) => i !== index);
    setCvData({ ...cvData, education: updatedEdu });
  };

  const handleEduChange = (index, field, value) => {
    const updatedEdu = [...cvData.education];
    updatedEdu[index][field] = value;
    setCvData({ ...cvData, education: updatedEdu });
  };

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "cv", "main"), { 
        ...cvData, 
        updatedAt: serverTimestamp() 
      });
      alert("CV Data Updated Successfully!");
    } catch (error) {
      console.error("Error updating CV:", error);
      alert("Failed to update CV!");
    }
  };

  if (loading) return <div className="p-10 text-white">Loading CV Data...</div>;

  return (
    <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 text-white space-y-8">
      <h2 className="text-2xl font-bold text-blue-400 flex items-center gap-2">
        <Icons.FileText /> CV & Contact Details
      </h2>
      
      {/* Basic Contact Info */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400 ml-1">Phone</label>
          <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl mt-1"
            value={cvData.phone} onChange={e => setCvData({...cvData, phone: e.target.value})} />
        </div>
        <div>
          <label className="text-xs text-gray-400 ml-1">Email</label>
          <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl mt-1"
            value={cvData.email} onChange={e => setCvData({...cvData, email: e.target.value})} />
        </div>
      </div>

      {/* Career Objective */}
      <div>
        <label className="block text-sm text-gray-400 mb-1 ml-1">Career Objective</label>
        <textarea className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" rows="4"
          value={cvData.objective} onChange={e => setCvData({...cvData, objective: e.target.value})} />
      </div>

      {/* Education Summary Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-gray-700 pb-2">
          <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
            <Icons.GraduationCap size={20} /> Education Summary
          </h3>
          <button onClick={addEducation} className="bg-cyan-600 hover:bg-cyan-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
            <Icons.Plus size={14} /> Add Education
          </button>
        </div>

        {cvData.education.map((edu, index) => (
          <div key={index} className="bg-gray-900 p-5 rounded-xl border border-gray-700 relative group">
            <button 
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Icons.Trash2 size={18} />
            </button>
            
            <div className="grid md:grid-cols-2 gap-4">
              <input type="text" placeholder="Degree / Course Name" className="p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                value={edu.degree} onChange={e => handleEduChange(index, 'degree', e.target.value)} />
              <input type="text" placeholder="School / University" className="p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                value={edu.school} onChange={e => handleEduChange(index, 'school', e.target.value)} />
              <input type="text" placeholder="Years (e.g. 2024 - Present)" className="p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                value={edu.year} onChange={e => handleEduChange(index, 'year', e.target.value)} />
              <input type="text" placeholder="Status (e.g. Grade A / Incomplete)" className="p-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm"
                value={edu.status} onChange={e => handleEduChange(index, 'status', e.target.value)} />
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      <button onClick={handleSave} className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
        <Icons.Save size={20} /> Update All CV Info
      </button>
    </div>
  );
};

export default CVManager;