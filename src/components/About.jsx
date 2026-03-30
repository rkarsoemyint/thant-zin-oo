import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import * as Icons from 'lucide-react';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const docRef = doc(db, "about", "info");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setAboutData(docSnap.data());
        }
      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium animate-pulse">Loading Profile...</p>
      </div>
    </div>
  );

  return (
    <section id="about" className="py-24 px-6 bg-transparent transition-colors duration-300 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-16 dark:text-white"
        >
          About <span className="text-blue-600">Me</span>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full"></div>
        </motion.h2>

        <div className="grid md:grid-cols-12 gap-10 items-start">
          
          {/* Left Side: Professional Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-7 space-y-8"
          >
            <div className="space-y-4">
              <h3 className="text-3xl font-bold text-gray-800 dark:text-blue-400">
                {aboutData?.specialization || "Full-stack Web & Mobile Developer"}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {aboutData?.bio || "မင်္ဂလာပါ! ကျွန်တော်ကတော့ ဝါသနာထက်သန်တဲ့ Web Developer တစ်ယောက်ဖြစ်ပါတယ်။ User တွေအတွက် အသုံးဝင်ပြီး လှပတဲ့ Digital Solution တွေကို ဖန်တီးပေးရတာကို နှစ်သက်ပါတယ်။"}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              {/* Location */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <Icons.MapPin size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Location</p>
                  <p className="font-medium dark:text-gray-200">{aboutData?.location || "Yangon, Myanmar"}</p>
                </div>
              </div>

              {/* Languages */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl text-green-600 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <Icons.Languages size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Languages</p>
                  <p className="font-medium dark:text-gray-200">{aboutData?.languages || "English, Chinese, Hindi"}</p>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl text-purple-600 transition-colors group-hover:bg-purple-600 group-hover:text-white">
                  <Icons.Briefcase size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Status</p>
                  <p className="font-medium dark:text-gray-200">{aboutData?.status || "Available for Projects"}</p>
                </div>
              </div>

              {/* Experience Years */}
              <div className="flex items-center gap-4 group">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-xl text-orange-600 transition-colors group-hover:bg-orange-600 group-hover:text-white">
                  <Icons.Zap size={22} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">Experience</p>
                  <p className="font-medium dark:text-gray-200">{aboutData?.experience_years || "Junior Web Developer"}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Education & Experience Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-5 space-y-6"
          >
            {/* Education Card */}
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-xl hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 text-blue-500">
                <Icons.GraduationCap size={28} />
                <h3 className="text-xl font-bold dark:text-white">Education & Studies</h3>
              </div>
              
              <div className="space-y-4">
                {aboutData?.education ? (
                  aboutData.education.split('|').map((item, index) => (
                    <div key={index} className={`${index !== 0 ? 'border-t border-gray-200 dark:border-gray-800 pt-4' : ''}`}>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                        {item.trim()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-sm">Education details loading...</p>
                )}
              </div>
            </div>

            {/* Certifications Card */}
            <div className="bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 p-6 rounded-2xl shadow-xl hover:border-orange-500/30 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6 text-orange-500">
                <Icons.Award size={28} />
                <h3 className="text-xl font-bold dark:text-white">Certifications</h3>
              </div>
              
              <ul className="space-y-4 text-gray-700 dark:text-gray-300 italic">
                {aboutData?.certifications ? (
                  aboutData.certifications.split('|').map((cert, index) => (
                    <li key={index} className="flex gap-3 text-sm">
                      <span className="text-orange-500 font-bold">•</span>
                      <span>{cert.trim()}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex gap-3 text-sm">
                      <span className="text-orange-500">•</span>
                      <span>Page Myanmar Web Engineer School (Grade A)</span>
                    </li>
                    <li className="flex gap-3 text-sm">
                      <span className="text-orange-500">•</span>
                      <span>Fairway Technology - Professional Web Developer 2</span>
                    </li>
                  </>
                )}
              </ul>
            </div>

            {/* Professional Experience Box */}
            <div className="group p-6 bg-gradient-to-br from-blue-600/10 to-blue-900/5 border border-blue-500/20 rounded-2xl shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                  <Icons.Briefcase size={22} />
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-lg tracking-wide">Professional Experience</h4>
                  <p className="text-blue-500 text-xs font-medium uppercase tracking-wider">Career Path</p>
                </div>
              </div>

              <div className="mt-4 bg-white/50 dark:bg-gray-950/40 p-4 rounded-xl border border-blue-500/10">
                <p className="text-gray-700 dark:text-blue-100 leading-relaxed text-sm">
                  {aboutData?.experience || "Focusing on Full-stack Development"}
                </p>
                
                <div className="flex gap-2 mt-4">
                  {["Web Dev", "Graphic Design"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] text-blue-600 dark:text-blue-300 font-bold uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;