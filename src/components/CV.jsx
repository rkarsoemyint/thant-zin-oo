import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const CV = () => {
  const [data, setData] = useState(null);
  const [educationData, setEducationData] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchCVAndAbout = async () => {
      try {
        // Fetch CV Data
        const cvSnap = await getDoc(doc(db, "cv", "main"));
        if (cvSnap.exists()) {
          setData(cvSnap.data());
        }

        // Fetch About Data (for Education & Studies fallback/sync)
        const aboutSnap = await getDoc(doc(db, "about", "info"));
        if (aboutSnap.exists()) {
          setEducationData(aboutSnap.data()?.education || null);
        }
      } catch (error) {
        console.error("Error fetching CV/About data:", error);
      }
    };
    fetchCVAndAbout();
  }, []);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: 'ThantZinOo_Software_Engineer_Profile',
  });

  const SafeIcon = ({ name, size = 18, className = "" }) => {
    const IconComponent = Icons[name] || Icons['Circle'];
    return <IconComponent size={size} className={className} />;
  };

  // Get raw education text from CV doc or fallback to About doc
  const rawEducation = data?.education || educationData;

  return (
    <section id="cv" className="py-10 px-4 bg-slate-50 min-h-screen text-slate-800 font-sans">
      <div className="max-w-[980px] mx-auto">
        
        {/* Action Bar */}
        <div className="flex justify-between items-center mb-6 no-print bg-white p-4 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-base font-bold text-slate-800">Developer Profile Preview</h1>
            <p className="text-xs text-slate-500">Full-Stack Web Engineer • Client Presentation Profile</p>
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
                <p className="text-teal-700 text-[11px] font-bold uppercase tracking-wider mt-1">Full-Stack Web Engineer</p>
              </div>

              {/* Contact Information */}
              <section>
                <h5 className="text-[11px] uppercase pb-1.5 mb-3 font-extrabold tracking-wider text-teal-800 border-b border-teal-600/30">
                  Contact & Links
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
                    <span className="leading-relaxed">Yangon, Myanmar</span>
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
                  Overview
                </h5>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex justify-between"><span className="text-slate-400">Nationality:</span> <span className="font-semibold text-slate-700">Myanmar</span></li>
                  <li className="flex justify-between"><span className="text-slate-400">Focus:</span> <span className="font-semibold text-slate-700">Web & API Solutions</span></li>
                </ul>
              </section>

              {/* Languages */}
              <section>
                <h5 className="text-[11px] uppercase pb-1.5 mb-2.5 font-extrabold tracking-wider text-teal-800 border-b border-teal-600/30">
                  Communication
                </h5>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between"><span>Burmese</span><span className="text-slate-500 font-medium">Native</span></div>
                  <div className="flex justify-between"><span>Chinese </span><span className="text-teal-700 font-medium">Basic</span></div>
                  <div className="flex justify-between"><span>Hindi </span><span className="text-teal-700 font-medium">Basic</span></div>
                  <div className="flex justify-between"><span>English</span><span className="text-slate-500 font-medium">Upper Intermediate</span></div>
                </div>
              </section>

              {/* Key Highlights */}
              <section className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                <div className="flex items-center gap-1.5 mb-1.5 text-amber-600 font-bold text-xs">
                  <SafeIcon name="Award" size={15} /> Highlights & Recognition
                </div>
                <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
                  <li><span className="font-semibold text-slate-800">Best UI/UX & Creative Award</span> for React Enterprise Application</li>
                  <li>Graduated with Distinction (Grade 'A') across Modern Web Engineering Modules</li>
                </ul>
              </section>

            </div>

            <div className="text-[10px] text-slate-400 text-center pt-4 border-t border-slate-200">
              Technical Profile • Verified Developer
            </div>
          </div>

          {/* Right Main Content */}
          <div className="md:w-2/3 bg-white p-8 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Professional Summary */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-2.5 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Target" size={16} className="text-teal-600" /> Professional Summary
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 text-justify font-normal">
                  {data?.objective || "Versatile Full-Stack Web Engineer with hands-on experience in building scalable web applications, robust backends, and responsive user interfaces. Specialized in modern JavaScript stacks (React, Next.js, Node.js) and Python (Django). Committed to delivering high-performance, secure, and user-centric web solutions tailored to meet client business requirements with clean and maintainable code architecture."}
                </p>
              </section>

              {/* Education & Academic Studies (About ထဲက Education ကို ပါ၀င်အောင် ချိတ်ဆက်ထားသည်) */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="GraduationCap" size={16} className="text-teal-600" /> Education & Academic Background
                </h4>
                <div className="space-y-2.5 text-xs">
                  {rawEducation ? (
                    rawEducation.split('|').map((eduItem, idx) => (
                      <div key={idx} className="relative pl-3.5 border-l-2 border-teal-600/40">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          {eduItem.trim()}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="relative pl-3.5 border-l-2 border-teal-600/40">
                      <p className="text-xs text-slate-700 leading-relaxed font-medium">
                        Diploma & Technical Training in Web Engineering & Computer Science Concepts.
                      </p>
                    </div>
                  )}
                </div>
              </section>

              {/* Technical Stack */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Cpu" size={16} className="text-teal-600" /> Technical Capabilities
                </h4>
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Frontend Engineering & UI/UX:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3', 'Vite', 'Responsive Design'].map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Backend & API Integration:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python / Django', 'Node.js / Express', 'PHP', 'RESTful APIs', 'Authentication & OAuth'].map(skill => (
                        <span key={skill} className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded text-[11px] font-semibold border border-teal-100">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1">Database, Cloud & Tools:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['MySQL', 'PostgreSQL', 'SQLite', 'Firebase / Cloud Firestore', 'Git / GitHub', 'VPS & cPanel', 'Vercel'].map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Core Responsibilities / Experience */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Briefcase" size={16} className="text-teal-600" /> Project Delivery & Experience
                </h4>
                <div className="relative pl-3.5 border-l-2 border-teal-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Full-Stack Software Engineer</h6>
                      <p className="text-[11px] text-teal-700 font-semibold">Web Development & Client Project Team</p>
                    </div>
                    <span className="text-[9px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-extrabold border border-teal-200">Active</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 mt-1.5 space-y-1 list-disc list-inside">
                    <li>Architects and develops end-to-end web applications customized for client requirements.</li>
                    <li>Engineers scalable backend APIs and connects efficient database models (MySQL, Firebase, SQLite).</li>
                    <li>Ensures cross-browser compatibility, high SEO ranking, optimal page speed, and seamless user experiences across mobile and desktop.</li>
                  </ul>
                </div>
              </section>

              {/* Specialization & Qualifications */}
              <section>
                <h4 className="text-xs font-black uppercase tracking-wider border-b-2 border-teal-600 pb-1 mb-3 text-slate-900 flex items-center gap-2">
                  <SafeIcon name="Award" size={16} className="text-teal-600" /> Professional Certification & Training
                </h4>

                <div className="space-y-3">
                  
                  {/* Web Engineer Course Graduation */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900">Web Engineering Professional Certificate</h6>
                        <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven (Singapore)</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Certified</span>
                    </div>
                  </div>

                  {/* React Developer Course */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          Advanced React & Frontend Development 
                          <span className="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-200">Grade A</span>
                          <span className="text-[9px] bg-emerald-50 text-emerald-800 px-1.5 py-0.2 rounded font-bold border border-emerald-200">🏆 Best UI/UX Award</span>
                        </h6>
                        <p className="text-[11px] text-slate-500">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Certified</span>
                    </div>
                  </div>

                  {/* Python Developer Course */}
                  <div className="relative pl-3.5 border-l-2 border-slate-300">
                    <div className="flex justify-between items-start">
                      <div>
                        <h6 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                          Python & Full-Stack Web Architecture
                          <span className="text-[9px] bg-amber-50 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-200">Grade A</span>
                        </h6>
                        <p className="text-[11px] text-slate-500">Page Myanmar & Cosmo Seven</p>
                      </div>
                      <span className="text-[9px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold">Certified</span>
                    </div>
                  </div>

                </div>
              </section>

            </div>

            {/* Guarantees / Quality Assurance Section */}
            <section className="pt-3 border-t border-slate-200 mt-4">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">Service Commitments</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 border border-slate-200 rounded bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-800">Clean & Scalable Code</p>
                  <p className="text-[10px] text-slate-500">Adhering to modern software architecture & security guidelines.</p>
                </div>
                <div className="p-2 border border-slate-200 rounded bg-slate-50/50">
                  <p className="text-[11px] font-bold text-slate-800">Responsive & Mobile First</p>
                  <p className="text-[10px] text-slate-500">Seamless integration and performance across all user devices.</p>
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
