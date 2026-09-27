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
    documentTitle: 'ThantZinOo_Professional_CV',
  });

  const SafeIcon = ({ name, size = 18, className = "" }) => {
    const IconComponent = Icons[name] || Icons['Circle'];
    return <IconComponent size={size} className={className} />;
  };

  return (
    <section id="cv" className="py-12 px-4 bg-slate-100 dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-[980px] mx-auto">
        
        {/* Print / Export Action Bar */}
        <div className="flex justify-between items-center mb-6 no-print bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">Curriculum Vitae Preview</h1>
            <p className="text-xs text-slate-500">Page-optimized for PDF export and printing</p>
          </div>
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md transition-all active:scale-95 text-xs tracking-wide"
          >
            <SafeIcon name="Printer" size={16} /> SAVE / PRINT PDF
          </button>
        </div>

        {/* Main Document Body */}
        <div 
          ref={componentRef} 
          className="bg-white text-slate-800 shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[1120px] rounded-2xl border border-slate-200/80"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          
          {/* Left Sidebar (Dark Cool Slate Theme) */}
          <div className="md:w-1/3 bg-slate-900 text-slate-100 p-8 flex flex-col justify-between">
            <div className="space-y-7">
              
              {/* Profile Card Header */}
              <div className="text-center pb-6 border-b border-slate-800">
                <div className="w-32 h-32 mx-auto rounded-full border-2 border-teal-500/80 p-1 bg-slate-800 shadow-inner mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Thant Zin Oo" 
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                  />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white uppercase">Thant Zin Oo</h2>
                <p className="text-teal-400 text-[11px] font-extrabold uppercase tracking-[2px] mt-1.5">Full-Stack Web Engineer</p>
              </div>

              {/* Contact Information */}
              <section>
                <h5 className="text-[11px] uppercase pb-2 mb-3.5 font-extrabold tracking-widest text-teal-400 border-b border-slate-800/80">
                  Contact
                </h5>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-3">
                    <SafeIcon name="Phone" size={14} className="text-teal-400 mt-0.5 shrink-0" /> 
                    <span>{data?.phone || "09 792460282"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <SafeIcon name="Mail" size={14} className="text-teal-400 mt-0.5 shrink-0" /> 
                    <span className="break-all">{data?.email || "tzoo2024@gmail.com"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <SafeIcon name="MapPin" size={14} className="text-teal-400 mt-0.5 shrink-0" /> 
                    <span className="leading-relaxed">8-B, Yuzana Garden City, Dagon Seikkan Township, Yangon</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <SafeIcon name="Github" size={14} className="text-teal-400 mt-0.5 shrink-0" /> 
                    <span className="break-all">{data?.github || "github.com/rkarsoemyint"}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <SafeIcon name="Globe" size={14} className="text-teal-400 mt-0.5 shrink-0" /> 
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

              {/* Personal Details */}
              <section>
                <h5 className="text-[11px] uppercase pb-2 mb-3 font-extrabold tracking-widest text-teal-400 border-b border-slate-800/80">
                  Personal Info
                </h5>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex justify-between"><span className="text-slate-500">DOB:</span> <span className="font-medium">12 Jul 1990</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Gender:</span> <span className="font-medium">Male</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Marital Status:</span> <span className="font-medium">Single</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Religion:</span> <span className="font-medium">Buddhist</span></li>
                  <li className="flex justify-between"><span className="text-slate-500">Nationality:</span> <span className="font-medium">Myanmar</span></li>
                </ul>
              </section>

              {/* Languages */}
              <section>
                <h5 className="text-[11px] uppercase pb-2 mb-3 font-extrabold tracking-widest text-teal-400 border-b border-slate-800/80">
                  Languages
                </h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between"><span>Burmese</span><span className="text-slate-400 font-medium">Native</span></div>
                  <div className="flex justify-between"><span>Chinese (HSK 5)</span><span className="text-teal-400 font-semibold">Advanced</span></div>
                  <div className="flex justify-between"><span>English</span><span className="text-slate-400">Intermediate</span></div>
                  <div className="flex justify-between"><span>Hindi</span><span className="text-slate-400">Basic</span></div>
                </div>
              </section>

              {/* Key Highlights / Awards */}
              <section className="bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/50">
                <div className="flex items-center gap-2 mb-2 text-amber-400 font-bold text-xs">
                  <SafeIcon name="Award" size={16} /> Key Achievements
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><span className="text-white font-semibold">Best UI/UX & Creative Award</span> in React Project</li>
                  <li>Grade 'A' in Web Engineering, React & Python Projects</li>
                </ul>
              </section>

            </div>

            <div className="text-[10px] text-slate-600 text-center pt-6 border-t border-slate-800/50">
              Verified Professional Portfolio CV
            </div>
          </div>

          {/* Right Main Content */}
          <div className="md:w-2/3 bg-white p-9 flex flex-col justify-between">
            <div className="space-y-7">
              
              {/* Career Objective */}
              <section>
                <h4 className="text-sm font-black uppercase tracking-wider border-b-2 border-teal-500 pb-1.5 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Target" size={18} className="text-teal-600" /> Career Objective
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 text-justify font-medium">
                  {data?.objective || "Passionate and detail-oriented Full-Stack Web Engineer with comprehensive hands-on experience in modern JavaScript (React, Next.js, Node.js), Python (Django), and PHP frameworks. Proven expertise in building clean UI/UX components, designing responsive web/mobile web applications, and implementing backend database architectures. Dedicated to clean code, performance optimization, and scalable solutions."}
                </p>
              </section>

              {/* Technical Skills Categorized */}
              <section>
                <h4 className="text-sm font-black uppercase tracking-wider border-b-2 border-teal-500 pb-1.5 mb-3.5 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Cpu" size={18} className="text-teal-600" /> Technical Skills
                </h4>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Frontend & UI/UX:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3', 'jQuery', 'Vite', 'Responsive Web Design'].map(skill => (
                        <span key={skill} className="bg-teal-50 text-teal-800 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-teal-100">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Backend & Frameworks:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python', 'Django Framework', 'PHP', 'Node.js', 'Express.js', 'Java OOP', 'C++'].map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-800 px-2.5 py-0.5 rounded text-[11px] font-semibold border border-slate-200">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Databases, Tools & Deployment:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['MySQL / PyMySQL', 'SQLite3', 'Firebase', 'GitHub / Git', 'VPS Management', 'cPanel & Domain', 'Odoo ERP System', 'SEO & SEM', 'WordPress Dev'].map(skill => (
                        <span key={skill} className="bg-slate-50 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Certifications & Qualifications */}
              <section>
                <h4 className="text-sm font-black uppercase tracking-wider border-b-2 border-teal-500 pb-1.5 mb-4 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Award" size={18} className="text-teal-600" /> Certified Education & Training
                </h4>

                <div className="space-y-4">
                  
                  {/* Web Engineer Course Graduation */}
                  <div className="relative pl-4 border-l-2 border-teal-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900">Web Engineer Course (Complete Graduation)</h6>
                        <p className="text-[11px] text-teal-700 font-medium">Page Myanmar & Cosmo Seven (Singapore)</p>
                      </div>
                      <span className="text-[9px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-extrabold">Jul 2026</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Graduated from the full Web Engineering Program covering PHP, Python Web App Development, MERN Stack, and On-Job Training.
                    </p>
                  </div>

                  {/* React Developer Course */}
                  <div className="relative pl-4 border-l-2 border-teal-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          React Developer Course 
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Grade A</span>
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">🏆 Best UI/UX Award</span>
                        </h6>
                        <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">Jul 2026</span>
                    </div>
                  </div>

                  {/* Python Developer Course & OJT Recommendation */}
                  <div className="relative pl-4 border-l-2 border-teal-500">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          Python Developer Course & Module 2 OJT
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Grade A</span>
                        </h6>
                        <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">May 2026</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">Practiced:</span> C++, Python, Java OOP, Django Framework, PyMySQL, SQLite3, VPS Management, Django API & Odoo ERP.
                    </p>
                  </div>

                  {/* Professional Web Developer 2 */}
                  <div className="relative pl-4 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900">Professional Web Developer - 2</h6>
                        <p className="text-[11px] text-slate-500 font-medium">Fairway Technology</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">Mar 2026</span>
                    </div>
                  </div>

                  {/* Web App Design & Professional Web Dev 1 */}
                  <div className="relative pl-4 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          Web App Design & Professional Web Developer (PHP)
                          <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">Grade A</span>
                        </h6>
                        <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">Nov - Dec 2025</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1">
                      <span className="font-semibold text-slate-700">Practiced:</span> HTML5, CSS3, Core PHP, MySQL, jQuery, Bootstrap, WordPress Plugin/Theme Development, SEO/SEM & cPanel.
                    </p>
                  </div>

                </div>
              </section>

            </div>

            {/* References Section */}
            <section className="pt-4 border-t border-slate-100 mt-4">
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">References</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 border border-slate-100 rounded-lg bg-slate-50/60">
                  <p className="text-[11px] font-bold text-slate-800">Page Myanmar & Cosmo Seven</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Times City, Level-4, Yangon</p>
                  <p className="text-[10px] text-teal-700 font-semibold mt-0.5">Tel: +95 9 254 343 133</p>
                </div>
                <div className="p-2.5 border border-slate-100 rounded-lg bg-slate-50/60">
                  <p className="text-[11px] font-bold text-slate-800">Fairway Technology</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">Yangon, Myanmar</p>
                  <p className="text-[10px] text-teal-700 font-semibold mt-0.5">Tel: 09 252 426 388</p>
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
