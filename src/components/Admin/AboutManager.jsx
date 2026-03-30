import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const AboutManager = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    bio: '',
    education: 'M.Sc (Animation) - Studies at AAFT, India',
    certifications: 'Web Engineer Course (Module 1 & 2 Completed - Grade A)',
    specialization: 'Full-stack Web & Mobile Dev',
    languages: 'English, Chinese, Hindi',
    location: 'Dagon Myothit, Yangon',
    experience: ''
  });

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "about", "info");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFormData(docSnap.data());
        }
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchAboutData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, "about", "info"), {
        ...formData,
        updatedAt: serverTimestamp()
      });
      alert("About Me Updated!");
    } catch (err) { alert("Update failed!"); }
  };

  if (loading) return <div className="text-center py-10 text-white">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl text-white">
        <h2 className="text-2xl font-bold mb-8 text-blue-400 flex items-center gap-2 border-b border-gray-700 pb-4">
          <Icons.UserCircle size={28} /> Update About Me Information
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bio Section */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">Personal Bio (Short Introduction)</label>
            <textarea className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" rows="3"
              value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} placeholder="ကိုယ့်အကြောင်း အကျဉ်းချုပ်ရေးရန်..."></textarea>
          </div>

          {/* Education & Certifications */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Education / Studies</label>
            <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" 
              value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Certifications</label>
            <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" 
              value={formData.certifications} onChange={e => setFormData({...formData, certifications: e.target.value})} />
          </div>

          {/* Specialization & Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Specialization</label>
            <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" 
              value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Languages</label>
            <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" 
              value={formData.languages} onChange={e => setFormData({...formData, languages: e.target.value})} />
          </div>

          {/* Location & Experience */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Location</label>
            <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" 
              value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Experience (Years/Level)</label>
            <input type="text" className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl" 
              value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} />
          </div>

          <button type="submit" className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2">
            <Icons.Save size={20} /> Save Profile Information
          </button>
        </form>
      </div>
    </div>
  );
};

export default AboutManager;