import { useState, useEffect, useRef } from 'react';
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
        const cvSnap = await getDoc(doc(db, "cv", "main"));
        if (cvSnap.exists()) {
          setData(cvSnap.data());
        }

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

  const SafeIcon = ({ name, size = 16, className = "" }) => {
    const IconComponent = Icons[name] || Icons['Circle'];
    return <IconComponent size={size} className={className} />;
  };

  const rawEducation = data?.education || educationData;

  return (
    <section id="cv" className="py-8 px-3 sm:px-6 bg-slate-100/80 min-h-screen text-slate-800 font-sans">
      <div className="max-w-[960px] mx-auto">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 no-print bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-sm border border-slate-200/80">
          <div>
            <h1 className="text-base font-bold text-slate-900 flex items-center gap-2">
              Developer Profile Preview
              <span className="text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full border border-teal-200">Interactive</span>
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">Full-Stack Web Engineer • Client Presentation Profile</p>
          </div>
          <button 
            onClick={() => handlePrint()}
            className="flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md hover:shadow-lg transition-all active:scale-95 text-xs tracking-wider cursor-pointer"
          >
            <SafeIcon name="Printer" size={16} /> SAVE / PRINT PDF
          </button>
        </div>

        {/* CV Document Container */}
        <div 
          ref={componentRef} 
          className="bg-white shadow-xl flex flex-col md:flex-row rounded-2xl border border-slate-200/80 overflow-hidden"
          style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
        >
          
          {/* Left Sidebar */}
          <div className="md:w-[35%] bg-slate-50/90 p-6 md:p-7 border-r border-slate-200 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              
              {/* Profile Card */}
              <div className="text-center pb-5 border-b border-slate-200/80">
                <div className="relative w-28 h-28 mx-auto mb-3">
                  <div className="w-full h-full rounded-full border-2 border-teal-600/80 p-1 bg-white shadow-sm overflow-hidden">
                    <img 
                      src="/logo.png" 
                      alt="Thant Zin Oo" 
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
                    />
                  </div>
                </div>
                <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Thant Zin Oo</h2>
                <p className="text-teal-700 text-[11px] font-extrabold uppercase tracking-widest mt-1">Full-Stack Web Engineer</p>
              </div>

              {/* Contact Links */}
              <section className="space-y-2">
                <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                  <SafeIcon name="UserCheck" size={13} className="text-teal-600" /> Contact & Portfolio
                </h5>
                <ul className="space-y-2.5 text-xs">
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <span className="p-1.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100 shrink-0"><SafeIcon name="Phone" size={13} /></span>
                    <span className="font-semibold text-slate-800">{data?.phone || "09 792460282"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <span className="p-1.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100 shrink-0"><SafeIcon name="Mail" size={13} /></span>
                    <span className="break-all font-semibold text-slate-800">{data?.email || "tzoo2024@gmail.com"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <span className="p-1.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100 shrink-0"><SafeIcon name="MapPin" size={13} /></span>
                    <span className="font-medium text-slate-700">Yangon, Myanmar</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <span className="p-1.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100 shrink-0"><SafeIcon name="Github" size={13} /></span>
                    <span className="break-all font-semibold text-slate-800">{data?.github || "github.com/rkarsoemyint"}</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-slate-700">
                    <span className="p-1.5 rounded-md bg-teal-50 text-teal-700 border border-teal-100 shrink-0"><SafeIcon name="Globe" size={13} /></span>
                    <a 
                      href="https://thant-zin-oo.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="break-all text-teal-700 hover:text-teal-800 font-bold underline underline-offset-2"
                    >
                      thant-zin-oo.vercel.app
                    </a>
                  </li>
                </ul>
              </section>

              {/* Personal Overview */}
              <section>
                <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                  <SafeIcon name="Info" size={13} className="text-teal-600" /> Key Overview
                </h5>
                <div className="bg-white/80 p-3 rounded-lg border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">Nationality:</span> <span className="font-bold text-slate-800">Myanmar</span></div>
                  <div className="flex justify-between items-center"><span className="text-slate-500 font-medium">Core Focus:</span> <span className="font-bold text-teal-700">Web & API Solutions</span></div>
                </div>
              </section>

              {/* Languages */}
              <section>
                <h5 className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
                  <SafeIcon name="Languages" size={13} className="text-teal-600" /> Languages
                </h5>
                <div className="bg-white/80 p-3 rounded-lg border border-slate-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">Burmese</span>
                    <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-bold">Native</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">English</span>
                    <span className="text-[10px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-bold border border-teal-100">Upper Intermediate</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">Chinese</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Basic</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">Hindi</span>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-semibold">Basic</span>
                  </div>
                </div>
              </section>

              {/* Key Highlights */}
              <section className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200/70 shadow-xs">
                <div className="flex items-center gap-1.5 mb-2 text-amber-800 font-black text-xs">
                  <SafeIcon name="Award" size={15} className="text-amber-600" /> Key Recognition
                </div>
                <ul className="text-[11px] text-amber-900/90 space-y-1.5 leading-relaxed list-disc list-inside font-medium">
                  <li><strong className="text-amber-950 font-bold">Best UI/UX & Creative Award</strong> for React Enterprise App</li>
                  <li>Graduated with <strong className="text-amber-950 font-bold">Distinction (Grade 'A')</strong> across Web Engineering Modules</li>
                </ul>
              </section>

            </div>

            <div className="text-[10px] text-slate-400 text-center pt-3 border-t border-slate-200/80 font-medium">
              Verified Technical Profile
            </div>
          </div>

          {/* Right Main Content */}
          <div className="md:w-[65%] bg-white p-6 md:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              
              {/* Professional Summary */}
              <section>
                <div className="flex items-center gap-2 border-b-2 border-teal-600/80 pb-1.5 mb-3">
                  <SafeIcon name="Target" size={18} className="text-teal-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Professional Summary</h4>
                </div>
                <p className="text-xs leading-relaxed text-slate-600 text-justify font-normal bg-slate-50/50 p-3.5 rounded-lg border border-slate-100">
                  {data?.objective || "Versatile Full-Stack Web Engineer with hands-on experience in building scalable web applications, robust backends, and responsive user interfaces. Specialized in modern JavaScript stacks (React, Next.js, Node.js) and Python (Django). Committed to delivering high-performance, secure, and user-centric web solutions tailored to meet client business requirements with clean and maintainable code architecture."}
                </p>
              </section>

              {/* Education & Academic Background */}
              <section>
                <div className="flex items-center gap-2 border-b-2 border-teal-600/80 pb-1.5 mb-3">
                  <SafeIcon name="GraduationCap" size={18} className="text-teal-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Education & Academic Background</h4>
                </div>
                <div className="space-y-3 text-xs">
                  {(() => {
                    if (Array.isArray(rawEducation)) {
                      return rawEducation.map((eduItem, idx) => {
                        if (typeof eduItem === 'object' && eduItem !== null) {
                          return (
                            <div key={idx} className="relative pl-4 border-l-2 border-teal-600/80 py-0.5">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h6 className="font-bold text-xs text-slate-900 leading-snug">
                                    {eduItem.degree || eduItem.title || 'Degree / Course'}
                                  </h6>
                                  <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                                    {eduItem.school || eduItem.institution || ''}
                                  </p>
                                </div>
                                <div className="text-right shrink-0 ml-2">
                                  {eduItem.year && (
                                    <span className="text-[10px] text-slate-400 font-medium block">
                                      {eduItem.year}
                                    </span>
                                  )}
                                  {eduItem.status && (
                                    <span className="text-[9px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5">
                                      {eduItem.status}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div key={idx} className="relative pl-4 border-l-2 border-teal-600/40 py-0.5">
                            <p className="text-xs text-slate-700 leading-relaxed font-medium">
                              {String(eduItem)}
                            </p>
                          </div>
                        );
                      });
                    }

                    if (typeof rawEducation === 'string' && rawEducation.trim().length > 0) {
                      return rawEducation.split('|').map((eduItem, idx) => (
                        <div key={idx} className="relative pl-4 border-l-2 border-teal-600/40 py-0.5">
                          <p className="text-xs text-slate-700 leading-relaxed font-medium">
                            {eduItem.trim()}
                          </p>
                        </div>
                      ));
                    }

                    return (
                      <div className="relative pl-4 border-l-2 border-teal-600/40 py-0.5">
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">
                          Diploma & Technical Training in Web Engineering & Computer Science Concepts.
                        </p>
                      </div>
                    );
                  })()}
                </div>
              </section>

              {/* Technical Capabilities */}
              <section>
                <div className="flex items-center gap-2 border-b-2 border-teal-600/80 pb-1.5 mb-3">
                  <SafeIcon name="Cpu" size={18} className="text-teal-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Technical Capabilities</h4>
                </div>
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Frontend Engineering & UI/UX:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS', 'Bootstrap', 'HTML5/CSS3', 'Vite', 'Responsive Design'].map(skill => (
                        <span key={skill} className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-200/80 transition-colors">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Backend & API Architecture:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['Python / Django', 'Node.js / Express', 'PHP', 'RESTful APIs', 'Authentication & OAuth'].map(skill => (
                        <span key={skill} className="bg-teal-50 text-teal-800 px-2.5 py-1 rounded-md text-[11px] font-bold border border-teal-200/60">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-800 block mb-1.5">Database, Cloud & Tools:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {['MySQL', 'PostgreSQL', 'SQLite', 'Firebase / Cloud Firestore', 'Git / GitHub', 'VPS & cPanel', 'Vercel'].map(skill => (
                        <span key={skill} className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-200/80">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Experience */}
              <section>
                <div className="flex items-center gap-2 border-b-2 border-teal-600/80 pb-1.5 mb-3">
                  <SafeIcon name="Briefcase" size={18} className="text-teal-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Project Delivery & Experience</h4>
                </div>
                <div className="relative pl-4 border-l-2 border-teal-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Full-Stack Software Engineer</h6>
                      <p className="text-[11px] text-teal-700 font-bold">Web Development & Client Project Team</p>
                    </div>
                    <span className="text-[9px] bg-teal-50 text-teal-800 px-2 py-0.5 rounded font-black border border-teal-200 uppercase tracking-wider">Active</span>
                  </div>
                  <ul className="text-[11px] text-slate-600 mt-2 space-y-1.5 list-disc list-inside leading-relaxed font-normal">
                    <li>Architects and develops end-to-end web applications customized for client requirements.</li>
                    <li>Engineers scalable backend APIs and connects efficient database models (MySQL, Firebase, SQLite).</li>
                    <li>Ensures cross-browser compatibility, high SEO ranking, optimal page speed, and seamless responsive design across devices.</li>
                  </ul>
                </div>
              </section>

              {/* Certifications */}
              <section>
                <div className="flex items-center gap-2 border-b-2 border-teal-600/80 pb-1.5 mb-3">
                  <SafeIcon name="CheckCircle" size={18} className="text-teal-600" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">Professional Certification & Training</h4>
                </div>

                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/40 flex justify-between items-center">
                    <div>
                      <h6 className="font-bold text-xs text-slate-900">Web Engineering Professional Certificate</h6>
                      <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven (Singapore)</p>
                    </div>
                    <span className="text-[9px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-bold shrink-0">Certified</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/40 flex justify-between items-center">
                    <div>
                      <h6 className="font-bold text-xs text-slate-900 flex flex-wrap items-center gap-1.5">
                        Advanced React & Frontend Development
                        <span className="text-[9px] bg-amber-100/80 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-200">Grade A</span>
                        <span className="text-[9px] bg-emerald-100/80 text-emerald-800 px-1.5 py-0.2 rounded font-bold border border-emerald-200">🏆 Best UI/UX</span>
                      </h6>
                      <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven</p>
                    </div>
                    <span className="text-[9px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-bold shrink-0">Certified</span>
                  </div>

                  <div className="p-2.5 rounded-lg border border-slate-200/80 bg-slate-50/40 flex justify-between items-center">
                    <div>
                      <h6 className="font-bold text-xs text-slate-900 flex flex-wrap items-center gap-1.5">
                        Python & Full-Stack Web Architecture
                        <span className="text-[9px] bg-amber-100/80 text-amber-800 px-1.5 py-0.2 rounded font-bold border border-amber-200">Grade A</span>
                      </h6>
                      <p className="text-[11px] text-slate-500 font-medium">Page Myanmar & Cosmo Seven</p>
                    </div>
                    <span className="text-[9px] bg-slate-200/70 text-slate-700 px-2 py-0.5 rounded font-bold shrink-0">Certified</span>
                  </div>
                </div>
              </section>

            </div>

            {/* Service Commitments Footer */}
            <section className="pt-3 border-t border-slate-200/80 mt-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Service Commitments</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2.5 border border-slate-200/80 rounded-lg bg-slate-50/60">
                  <p className="text-[11px] font-bold text-slate-800">Clean & Scalable Code</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Adhering to modern software architecture & security guidelines.</p>
                </div>
                <div className="p-2.5 border border-slate-200/80 rounded-lg bg-slate-50/60">
                  <p className="text-[11px] font-bold text-slate-800">Responsive & Mobile First</p>
                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Seamless integration and performance across all user devices.</p>
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
