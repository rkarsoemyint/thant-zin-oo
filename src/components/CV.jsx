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
    <section id="cv" className="py-20 px-4 bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-[950px] mx-auto">
        
        {/* Print Button */}
        <div className="flex justify-end mb-6 no-print">
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all active:scale-95 text-sm"
          >
            <SafeIcon name="Printer" size={18} /> SAVE AS PDF
          </button>
        </div>

        {/* CV Main Container */}
        <div 
          ref={componentRef} 
          className="bg-white text-gray-800 shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[1120px] rounded-xl border border-gray-100"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          
          {/* Left Column (Modern Cool-Slate Sidebar) */}
          <div className="md:w-1/3 bg-slate-900 text-slate-100 p-9 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="text-center pb-4 border-b border-slate-800">
                <div className="w-28 h-28 mx-auto rounded-full border-2 border-teal-500 overflow-hidden mb-4 p-1 bg-slate-800">
                  <img src="/logo.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
                </div>
                <h2 className="text-2xl font-black tracking-tight uppercase text-white">Thant Zin Oo</h2>
                <p className="text-teal-400 text-[10px] font-extrabold uppercase tracking-[2.5px] mt-2">Full-Stack Web Engineer</p>
              </div>

              {/* Contact Section */}
<section>
  <h5 className="text-[11px] uppercase pb-2 mb-4 font-bold tracking-widest text-slate-400 border-b border-slate-800">Contact</h5>
  <ul className="space-y-3.5 text-xs text-slate-300">
    <li className="flex items-start gap-3">
      <SafeIcon name="Phone" size={14} className="text-teal-400 mt-0.5 shrink-0"/> 
      <span>{data?.phone || "09 792460282"}</span>
    </li>
    <li className="flex items-start gap-3">
      <SafeIcon name="Mail" size={14} className="text-teal-400 mt-0.5 shrink-0"/> 
      <span className="break-all">{data?.email || "tzoo2024@gmail.com"}</span>
    </li>
    <li className="flex items-start gap-3">
      <SafeIcon name="MapPin" size={14} className="text-teal-400 mt-0.5 shrink-0"/> 
      <span className="leading-relaxed">8-B, Yuzana Garden City, Dagon Seikkan Township, Yangon</span>
    </li>
    <li className="flex items-start gap-3">
      <SafeIcon name="Github" size={14} className="text-teal-400 mt-0.5 shrink-0"/> 
      <span className="break-all">{data?.github || "github.com/rkarsoemyint"}</span>
    </li>
    <li className="flex items-start gap-3">
      <SafeIcon name="Globe" size={14} className="text-teal-400 mt-0.5 shrink-0"/> 
      <a 
        href="https://thant-zin-oo.vercel.app/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="break-all text-teal-400 hover:underline font-medium"
      >
        thant-zin-oo.vercel.app
      </a>
    </li>
  </ul>
</section>
             
              {/* Personal Details Section */}
              <section>
                <h5 className="text-[11px] uppercase pb-2 mb-4 font-bold tracking-widest text-slate-400 border-b border-slate-800">Personal Details</h5>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex justify-between"><span className="text-slate-500">DOB:</span> <span className="font-medium">12 Jul 1990</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Gender:</span> <span className="font-medium">Male</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Marital Status:</span> <span className="font-medium">Single</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Religion:</span> <span className="font-medium">Buddhist</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Nationality:</span> <span className="font-medium">Myanmar</span></li>
                </ul>
              </section>

              {/* Education Section */}
              <section>
                <h5 className="text-[11px] uppercase pb-2 mb-4 font-bold tracking-widest text-slate-400 border-b border-slate-800">Education Summary</h5>
                <div className="space-y-4">
                  {data?.education?.length > 0 ? (
                    data.education.map((edu, index) => (
                      <div key={index} className="space-y-0.5">
                        <p className="text-xs font-bold text-teal-400">{edu.degree}</p>
                        <p className="text-[11px] text-slate-400">{edu.school}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] text-slate-500 font-bold tracking-wider">{edu.year}</span>
                          {edu.status && (
                            <span className="text-[8px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded-full font-bold border border-slate-700">
                              {edu.status}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-[11px] text-slate-600 italic">M.Sc. in Animation & Technical Qualifications</div>
                  )}
                </div>
              </section>

              {/* Languages Section */}
              <section>
                <h5 className="text-[11px] uppercase pb-2 mb-4 font-bold tracking-widest text-slate-400 border-b border-slate-800">Languages</h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between"><span>Burmese</span><span className="text-slate-500 italic">Native</span></div>
                  <div className="flex justify-between"><span>English</span><span className="text-slate-500">Intermediate</span></div>
                  <div className="flex justify-between"><span>Chinese (HSK 5)</span><span className="text-slate-500">Advanced</span></div>
                  <div className="flex justify-between"><span>Hindi</span><span className="text-slate-500">Basic</span></div>
                </div>
              </section>
            </div>
            
            {/* Footer Note */}
            <div className="text-[10px] text-slate-600 text-center pt-6 border-t border-slate-800/50">
              Generated Portfolio CV
            </div>
          </div>

          {/* Right Column (Clean & Sophisticated Content Body) */}
          <div className="md:w-2/3 bg-white p-11 flex flex-col justify-between">
            <div>
              {/* Career Objective */}
              <section className="mb-9">
                <h4 className="text-base font-black uppercase tracking-wider border-b-2 border-teal-500 pb-1.5 mb-3.5 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Target" size={16} className="text-teal-600" /> Career Objective
                </h4>
                <p className="text-xs leading-relaxed text-gray-600 text-justify font-medium">
                  {data?.objective || "Passionate and detail-oriented Full-Stack Web Engineer with a robust capability in crafting efficient frontend interfaces and scalable backend solutions. Proficient in the MERN Stack, Next.js, and modern PHP/Python ecosystems. Dedicated to implementing clean code architecture and seamless user experiences while continuously learning and adaptive to state-of-the-art technologies."}
                </p>
              </section>

              {/* Technical Skills (ခွဲခြားပြင်ဆင်ပြီးသား Skills Section) */}
              <section className="mb-9">
                <h4 className="text-base font-black uppercase tracking-wider border-b-2 border-teal-500 pb-1.5 mb-4 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Cpu" size={16} className="text-teal-600" /> Technical Skills
                </h4>
                <div className="space-y-4">
                  {/* Full-Stack Ecosystem */}
                  <div>
                    <h6 className="text-[10px] font-extrabold text-teal-600 mb-2 uppercase tracking-wider">Full-Stack Ecosystem</h6>
                    <div className="flex flex-wrap gap-1.5">
                      {['MERN Stack', 'Next.js (React)', 'Firebase'].map(skill => (
                        <span key={skill} className="bg-teal-50 text-teal-700 px-2.5 py-1 rounded text-[11px] font-bold border border-teal-100/70">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Frontend Architecture */}
                  <div>
                    <h6 className="text-[10px] font-extrabold text-slate-500 mb-2 uppercase tracking-wider">Frontend Development</h6>
                    <div className="flex flex-wrap gap-1.5">
                      {['HTML5 / CSS3', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'Vite'].map(skill => (
                        <span key={skill} className="bg-slate-50 text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold border border-slate-200/60">{skill}</span>
                      ))}
                    </div>
                  </div>

                  {/* Backend & Databases */}
                  <div>
                    <h6 className="text-[10px] font-extrabold text-slate-500 mb-2 uppercase tracking-wider">Backend & Databases</h6>
                    <div className="flex flex-wrap gap-1.5">
                      {['PHP', 'Python (Django)', 'MySQL', 'Node.js', 'Express.js'].map(skill => (
                        <span key={skill} className="bg-slate-50 text-slate-700 px-2.5 py-1 rounded text-[11px] font-semibold border border-slate-200/60">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional Training */}
              <section className="mb-9">
                <h4 className="text-base font-black uppercase tracking-wider border-b-2 border-teal-500 pb-1.5 mb-4 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Award" size={16} className="text-teal-600" /> Professional Training
                </h4>
                <div className="space-y-5">
                  <div className="relative pl-5 border-l border-slate-200">
                    <div className="absolute w-2 h-2 bg-teal-500 rounded-full -left-[4.5px] top-1.5"></div>
                    <div className="flex justify-between items-start mb-0.5">
                      <h6 className="font-bold text-xs text-slate-900">Professional Web Developer - 2</h6>
                      <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold border border-emerald-100">Mar 2026</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium">Fairway Technology</p>
                  </div>

                  <div className="relative pl-5 border-l border-slate-200">
                    <div className="absolute w-2 h-2 bg-teal-500 rounded-full -left-[4.5px] top-1.5"></div>
                    <div className="flex justify-between items-start mb-0.5">
                      <h6 className="font-bold text-xs text-slate-900">Web Engineer Course</h6>
                      <span className="text-[9px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold border border-amber-100">Ongoing</span>
                    </div>
                    <p className="text-[11px] text-gray-500 font-medium mb-2.5">Joint Program: Page Myanmar & Cosmo Seven (Singapore)</p>
                    
                    {/* Module Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="bg-slate-50 p-2.5 rounded border-l-2 border-teal-500">
                        <p className="text-[11px] font-bold text-slate-800">Module 1 & 2 (Grade A)</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">Full-stack integration, Core PHP, MySQL architecture, and Django Ecosystem.</p>
                      </div>
                      <div className="bg-slate-50 p-2.5 rounded border-l-2 border-slate-300">
                        <p className="text-[11px] font-bold text-slate-700">Module 3: Mobile Apps</p>
                        <p className="text-[10px] text-gray-500 mt-0.5 leading-normal">Cross-platform development utilizing React Native with ES6+ syntax.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* References */}
            <section className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">References</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 border border-gray-100 rounded bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-800">Fairway Technology</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Tel: 09 252 426 388</p>
                </div>
                <div className="p-2.5 border border-gray-100 rounded bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-800">Page Myanmar</p>
                  <p className="text-[10px] text-gray-500 mt-0.5">Tel: +95 9443666912</p>
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
