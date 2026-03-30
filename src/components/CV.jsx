import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const CV = () => {
  const [data, setData] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
  const fetchCV = async () => {
    const docSnap = await getDoc(doc(db, "cv", "main"));
    if (docSnap.exists()) {
      setData(docSnap.data());
    }
  };
  fetchCV();
}, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'ThantZinOo_Professional_CV',
  });

  const SafeIcon = ({ name, size = 18, className = "" }) => {
    const IconComponent = Icons[name] || Icons['Circle'];
    return <IconComponent size={size} className={className} />;
  };

  return (
    <section id="cv" className="py-20 px-4 bg-gray-100 dark:bg-gray-950 transition-colors">
      <div className="max-w-[950px] mx-auto">
        
        {/* Print Button */}
        <div className="flex justify-end mb-6 no-print">
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95"
          >
            <SafeIcon name="Printer" size={20} /> SAVE AS PDF
          </button>
        </div>

        {/* CV Main Container */}
        <div 
          ref={componentRef} 
          className="bg-white text-gray-800 shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[1100px]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          
          {/* Left Column (Sidebar) */}
          <div className="md:w-1/3 bg-[#1a252f] text-white p-10 flex flex-col">
            <div className="text-center mb-10">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-gray-700 overflow-hidden mb-4 bg-white">
                <img src="/logo.png" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">THANT ZIN OO</h2>
              <p className="text-cyan-400 text-xs font-bold uppercase tracking-[2px] mt-2">Web & Mobile Developer</p>
            </div>

            <div className="space-y-8">
              {/* Contact Section */}
              <section>
                <h5 className="text-xs uppercase border-b border-gray-700 pb-2 mb-4 font-bold tracking-widest text-gray-400">Contact</h5>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center gap-3"><SafeIcon name="Phone" size={16} className="text-cyan-400"/> {data?.phone || "09 792460282"}</li>
                  <li className="flex items-center gap-3"><SafeIcon name="Mail" size={16} className="text-cyan-400"/> {data?.email || "tzoo2024@gmail.com"}</li>
                  <li className="flex items-center gap-3"><SafeIcon name="MapPin" size={16} className="text-cyan-400"/> Yangon, Myanmar</li>
                  <li className="flex items-center gap-3"><SafeIcon name="Github" size={16} className="text-cyan-400"/> {data?.github || "github.com/rkarsoemyint"}</li>
                </ul>
              </section>

              {/* Education Section */}
             
<section>
  <h5 className="text-xs uppercase border-b border-gray-700 pb-2 mb-4 font-bold tracking-widest text-gray-400">
    Education Summary
  </h5>
  <div className="space-y-5">
    
    {data?.education?.length > 0 ? (
      data.education.map((edu, index) => (
        <div key={index}>
          <p className="text-sm font-bold text-cyan-400">{edu.degree}</p>
          <p className="text-xs opacity-70">{edu.school}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
              {edu.year}
            </span>
            {edu.status && (
              <span className="text-[9px] bg-gray-800 text-yellow-500 px-2 py-0.5 rounded-full font-bold">
                {edu.status}
              </span>
            )}
          </div>
        </div>
      ))
    ) : (
    
      <div className="opacity-50 italic text-[10px] text-gray-500">
        No education data found. Please add from Admin Dashboard.
      </div>
    )}
  </div>
</section>

              {/* Languages Section */}
              <section>
                <h5 className="text-xs uppercase border-b border-gray-700 pb-2 mb-4 font-bold tracking-widest text-gray-400">Languages</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between"><span>Burmese</span><span className="opacity-60 italic">Native</span></div>
                  <div className="flex justify-between"><span>English</span><span className="opacity-60">Intermediate</span></div>
                  <div className="flex justify-between"><span>Hindi</span><span className="opacity-60">Basic</span></div>
                </div>
              </section>
            </div>
          </div>

          {/* Right Column (Content) */}
          <div className="md:w-2/3 bg-white p-12">
            
            {/* Career Objective */}
            <section className="mb-10">
              <h4 className="text-lg font-extrabold uppercase tracking-widest border-b-2 border-cyan-500 pb-2 mb-4 text-[#1a252f]">Career Objective</h4>
              <p className="text-sm leading-relaxed text-gray-600 text-justify italic">
                {data?.objective || "Results-oriented developer with a solid foundation in Full-stack Web Development and Mobile App Solutions..."}
              </p>
            </section>

            {/* Technical Skills */}
            <section className="mb-10">
              <h4 className="text-lg font-extrabold uppercase tracking-widest border-b-2 border-cyan-500 pb-2 mb-4 text-[#1a252f]">Technical Skills</h4>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h6 className="text-[10px] font-bold text-cyan-600 mb-2 uppercase">Web Technologies</h6>
                  <div className="flex flex-wrap gap-2">
                    {['HTML5/CSS3', 'JS (ES6+)', 'React/Next.js', 'PHP/MySQL', 'Express.js', 'Tailwind'].map(skill => (
                      <span key={skill} className="bg-blue-50 text-blue-700 px-3 py-1 rounded text-[11px] font-bold border border-blue-100">{skill}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h6 className="text-[10px] font-bold text-cyan-600 mb-2 uppercase">Mobile & Backend</h6>
                  <div className="flex flex-wrap gap-2">
                    {['React Native', 'Python (Django)', 'Java (OOP)', 'Odoo ERP'].map(skill => (
                      <span key={skill} className="bg-gray-50 text-gray-700 px-3 py-1 rounded text-[11px] font-bold border border-gray-200">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section className="mb-10">
              <h4 className="text-lg font-extrabold uppercase tracking-widest border-b-2 border-cyan-500 pb-2 mb-4 text-[#1a252f]">Professional Training</h4>
              <div className="space-y-6">
                <div className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[7px] top-1"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h6 className="font-bold text-sm">Professional Web Developer - 2</h6>
                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">Mar 2026</span>
                  </div>
                  <p className="text-xs text-gray-500">Fairway Technology</p>
                </div>

                <div className="relative pl-6 border-l-2 border-gray-100">
                  <div className="absolute w-3 h-3 bg-cyan-500 rounded-full -left-[7px] top-1"></div>
                  <h6 className="font-bold text-sm mb-1">Web Engineer Course (Ongoing)</h6>
                  <p className="text-xs text-gray-500 mb-3">Page Myanmar & Cosmo Seven</p>
                  
                  {/* Module Cards */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-cyan-500">
                      <p className="text-xs font-bold text-cyan-700">Module 1 & 2 (Grade A)</p>
                      <p className="text-[10px] text-gray-600 mt-1 leading-normal">Full-stack basics, PHP, MySQL, Django, Python and ERP Systems.</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border-l-4 border-gray-300">
                      <p className="text-xs font-bold text-gray-700">Module 3: Mobile Development</p>
                      <p className="text-[10px] text-gray-600 mt-1 leading-normal">React Native, Android & iOS projects using ES6+.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* References */}
            <section>
              <h4 className="text-lg font-extrabold uppercase tracking-widest border-b-2 border-cyan-500 pb-2 mb-4 text-[#1a252f]">References</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border rounded-lg bg-gray-50">
                  <p className="text-[11px] font-bold">Fairway Technology</p>
                  <p className="text-[10px] text-gray-500 mt-1">09 252 426 388</p>
                </div>
                <div className="p-3 border rounded-lg bg-gray-50">
                  <p className="text-[11px] font-bold">Page Myanmar</p>
                  <p className="text-[10px] text-gray-500 mt-1">+95 9443666912</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;