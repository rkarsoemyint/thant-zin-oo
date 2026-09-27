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
      try {
        const docSnap = await getDoc(doc(db, "cv", "main"));
        if (docSnap.exists()) {
          setData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching CV data:", error);
      }
    };
    fetchCV();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'ThantZinOo_Junior_Web_Developer_CV',
  });

  const SafeIcon = ({ name, size = 18, className = "" }) => {
    const IconComponent = Icons[name] || Icons['Circle'];
    return <IconComponent size={size} className={className} />;
  };

  return (
    <section id="cv" className="py-10 px-4 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="max-w-[980px] mx-auto">
        
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6 no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-base font-bold text-slate-800">Curriculum Vitae Preview</h1>
            <p className="text-xs text-slate-500">Junior Web Developer • Light Professional Theme</p>
          </div>
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-sm transition-all active:scale-95 text-xs tracking-wide"
          >
            <SafeIcon name="Printer" size={16} /> SAVE / PRINT PDF
          </button>
        </div>

        {/* Main Resume Sheet */}
        <div 
          ref={componentRef} 
          className="bg-white shadow-xl flex flex-col md:flex-row overflow-hidden min-h-[1100px] rounded-xl border border-slate-200"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          
          {/* Left Column (Light Slate Background) */}
          <div className="md:w-1/3 bg-slate-50/80 p-7 border-r border-slate-200 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Profile Card Header */}
              <div className="text-center pb-5 border-b border-slate-200">
                <div className="w-28 h-28 mx-auto rounded-full border-2 border-teal-600 p-1 bg-white shadow-sm mb-3">
                  <img 
                    src="/logo.png" 
                    alt="Thant Zin Oo" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Thant Zin Oo</h2>
                <p className="text-teal-700 text-[11px] font-bold uppercase tracking-wider mt-1">Junior Web Developer</p>
              </div>

              {/* Contact Information */}
              <section>
                <h5 className="text-[11px] uppercase pb-1.5 mb-3 font-extrabold tracking-wider text-teal-800 border-b border-teal-600/30">
                  Contact
                </h5>
                <ul className="space-y-2.5 text-xs text-slate-600">
                  <li className="flex items-start gap-2.5">
                    <SafeIcon name="Phone" size={14} className="text-teal-600 mt-0.5 shrink-0" /> 
                    <span className="font-medium text-slate-700">{data?.phone || "09 792460282"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <SafeIcon name="Mail" size={14} className="text-teal-600 mt-0.5 shrink-0" /> 
                    <span className="break-all font-medium text-slate-700">{data?.email || "tzoo2024@gmail.com"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <SafeIcon name="MapPin" size={14} className="text-teal-600 mt-0.5 shrink-0" /> 
                    <span className="leading-relaxed">Dagon Seikkan Township, Yangon</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <SafeIcon name="Github" size={14} className="text-teal-600 mt-0.5 shrink-0" /> 
                    <span className="break-all font-medium text-slate-700">{data?.github || "github.com/rkarsoemyint"}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <SafeIcon name="Globe" size={14} className="text-teal-600 mt-0.5 shrink-0" /> 
                    <a 
                      href="https://thant-zin-oo.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="break-all text-teal-700 hover:underline font-semibold"
                    >
                      thant-zin-oo.vercel.app
                    </a>
                  </li>
                </ul>
              </section>

              {/* Personal Details */}
              <section>
                <h5 className="text-[11px] uppercase pb-1.5 mb-2.5 font-extrabold tracking-wider text-teal-800 border-b border-teal-600/30">
                  Personal Info
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex justify-between"><span className="text-slate-400">DOB:</span> <span className="font-semibold text-slate-700">12 Jul 1990</span></li>
                  <li className="flex justify-between"><span className="text-slate-400">Gender:</span> <span className="font-semibold text-slate-700">Male</span></li>
                  <li className="flex justify-between"><span className="text-slate-400">Marital Status:</span> <span className="font-semibold text-slate-700">Single</span></li>
                  <li className="flex justify-between"><span className="text-slate-400">Nationality:</span> <span className="font-semibold text-slate-700">Myanmar</span></li>
                </ul>
              </section>

              {/* Languages */}
              <section>
                <h5 className="text-[11px] uppercase pb-1.5 mb-2.5 font-extrabold tracking-wider text-teal-800 border-b border-teal-600/30">
                  Languages
                </h5>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between"><span>Burmese</span><span className="text-slate-500 font-medium">Native</span></div>
                  <div className="flex justify-between"><span>Chinese (HSK 5)</span><span className="text-teal-700 font-bold">Advanced</span></div>
                  <div className="flex justify-between"><span>English</span><span className="text-slate-500">Intermediate</span></div>
                  <div className="flex justify-between"><span>Hindi</span><span className="text-slate-500">Basic</span></div>
                </div>
              </section>

              {/* Key Achievements */}
              <section className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5 text-amber-600 font-bold text-xs">
                  <SafeIcon name="Award" size={15} /> Key Achievements
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  <li><span className="font-semibold text-slate-800">Best UI/UX & Creative Award</span> in React Project</li>
                  <li>Grade 'A' in Web Engineering, React & Python Modules</li>
                </ul>
              </section>

            </div>

            <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-200">
              Professional Portfolio CV
            </div>
          </div>

          {/* Right Main Content */}
          <div className="md:w-2/3 bg-white p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Career Objective */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-2.5 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Target" size={16} className="text-teal-600" /> Career Objective
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 text-justify font-normal">
                  {data?.objective || "Results-driven Junior Web Developer with a strong foundation in Full-Stack Web Development, having successfully completed Module 1, 2, and 3 along with On-Job Training at Page Myanmar Web Engineering School. Proficient in JavaScript (React, Next.js, Node.js), Python (Django), PHP, and modern UI/UX design. Passionate about building responsive web applications, writing clean maintainable code, and contributing to innovative software solutions in a dynamic team environment."}
                </p>
              </section>

              {/* Technical Skills */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Cpu" size={16} className="text-teal-600" /> Technical Skills
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Frontend & UI/UX:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3', 'jQuery', 'Vite', 'Responsive Design'].map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Backend & Frameworks:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'Django', 'PHP', 'Node.js', 'Express.js', 'Java OOP', 'C++'].map(skill => (
                        <span key={skill} className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-teal-100">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Databases, Tools & Deployment:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['MySQL / PyMySQL', 'SQLite3', 'Firebase', 'GitHub / Git', 'VPS Management', 'cPanel', 'Odoo ERP', 'SEO & SEM', 'WordPress'].map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Professional Experience */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Briefcase" size={16} className="text-teal-600" /> Professional Experience
                </h4>
                <div className="relative pl-3.5 border-l-2 border-teal-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Junior Web Developer</h6>
                      <p className="text-[11px] text-teal-700 font-semibold">Page Myanmar Web Engineering School</p>
                    </div>
                    <span className="text-[9px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-extrabold border border-teal-200">Present</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 mt-1.5 space-y-1 list-disc list-inside">
                    <li>Developed and maintained responsive web applications using React, Next.js, and Django.</li>
                    <li>Collaborated on building backend REST APIs and managing database structures (MySQL, SQLite, Firebase).</li>
                    <li>Participated in real-world project workflows and On-Job Training (OJT) tasks.</li>
                  </ul>
                </div>
              </section>

              {/* Certifications & Qualifications */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Award" size={16} className="text-teal-600" /> Education & Certifications
                </h4>

                <div className="space-y-3">
                  
                  {/* Web Engineer Course Graduation */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900">Web Engineer Course (Complete Graduation)</h6>
                        <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven (Singapore)</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Jul 2026</span>
                    </div>
                  </div>

                  {/* React Developer Course */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          React Developer Course 
                          <span className="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-200">Grade A</span>
                          <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-bold border border-emerald-200">🏆 Best UI/UX Award</span>
                        </h6>
                        <p className="text-[11px] text-slate-500">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Jul 2026</span>
                    </div>
                  </div>

                  {/* Python Developer Course */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          Python Developer Course & Module 2 OJT
                          <span className="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-200">Grade A</span>
                        </h6>
                        <p className="text-[11px] text-slate-500">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">May 2026</span>
                    </div>
                  </div>

                  {/* Professional Web Developer 2 */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900">Professional Web Developer - 2</h6>
                        <p className="text-[11px] text-slate-500">Fairway Technology</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Mar 2026</span>
                    </div>
                  </div>

                </div>
              </section>

            </div>

            {/* References Section */}
            <section className="pt-3 border-t border-slate-200 mt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">References</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 border border-slate-200 rounded bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-800">Page Myanmar & Cosmo Seven</p>
                  <p className="text-[10px] text-slate-500">Times City, Level-4, Yangon</p>
                  <p className="text-[10px] text-teal-700 font-semibold">Tel: +95 9 254 343 133</p>
                </div>
                <div className="p-2 border border-slate-200 rounded bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-800">Fairway Technology</p>
                  <p className="text-[10px] text-slate-500">Yangon, Myanmar</p>
                  <p className="text-[10px] text-teal-700 font-semibold">Tel: 09 252 426 388</p>
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
