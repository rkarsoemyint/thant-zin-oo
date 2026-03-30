import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase'; 
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const q = query(collection(db, "skills"), orderBy("percentage", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

 
  const SkillBar = ({ name, level }) => (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-semibold text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-blue-600 font-bold">{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 h-3 rounded-full"
        ></motion.div>
      </div>
    </div>
  );

  if (loading) return <div className="text-center py-20 dark:text-white">Loading Skills...</div>;

  const frontendSkills = skills.filter(s => s.category === 'Frontend');
  const backendSkills = skills.filter(s => s.category === 'Backend' || s.category === 'Database');
  const otherSkills = skills.filter(s => !['Frontend', 'Backend', 'Database'].includes(s.category));

  return (
    <section id="skills" className="py-20 px-6 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 underline decoration-blue-500 decoration-4 underline-offset-8 dark:text-white">
          My Skills
        </h2>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Frontend Section */}
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-blue-600 flex items-center">
              <span className="mr-2">🎨</span> Frontend Development
            </h3>
            {frontendSkills.length > 0 ? (
              frontendSkills.map(skill => (
                <SkillBar key={skill.id} name={skill.name} level={skill.percentage} />
              ))
            ) : (
              <p className="text-gray-500 italic">No frontend skills added yet.</p>
            )}
          </div>

          {/* Backend & Others Section */}
          <div className="p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold mb-8 text-green-600 flex items-center">
              <span className="mr-2">⚙️</span> Backend & Others
            </h3>
            {[...backendSkills, ...otherSkills].length > 0 ? (
              [...backendSkills, ...otherSkills].map(skill => (
                <SkillBar key={skill.id} name={skill.name} level={skill.percentage} />
              ))
            ) : (
              <p className="text-gray-500 italic">No backend skills added yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;