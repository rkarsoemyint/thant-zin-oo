import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import * as Icons from 'lucide-react';

const Contact = () => {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const validateEmail = (email) => {
    
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const userName = formData.get('name').trim();
    const userEmail = formData.get('email').trim();
    const userMessage = formData.get('message').trim();

    if (userName.length < 3) {
      alert("ကျေးဇူးပြု၍ နာမည်အမှန် (အနည်းဆုံး ၃ လုံး) ရိုက်ထည့်ပေးပါဗျာ။");
      return;
    }

    if (!validateEmail(userEmail)) {
      alert("Email Format မမှန်ကန်ပါ။ ဥပမာ - example@gmail.com");
      return;
    }

    if (userMessage.length < 10) {
      alert("Message သည် အနည်းဆုံး စာလုံး ၁၀ လုံးခန့် ရှိရပါမယ်ဗျာ။");
      return;
    }

    setIsSending(true);

    emailjs.sendForm(
      'service_fwr5cgf',
      'template_z4mujig',
      form.current,
      'JUbANX8zcl-N1inTc'
    )
    .then((result) => {
        alert("Message sent successfully! ✅ အစ်ကို့ Gmail ထဲကို စာရောက်သွားပါပြီ။");
        form.current.reset(); 
    }, (error) => {
        alert("Failed to send message. ❌ စနစ်ချို့ယွင်းမှု ဖြစ်နေပါတယ်။");
        console.log(error.text);
    })
    .finally(() => setIsSending(false));
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gray-950 text-white transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16 text-cyan-400 uppercase tracking-widest">
          Get In Touch
        </h2>
        
       
        <div className="grid md:grid-cols-2 gap-12 items-start">
          
          {/* ဘယ်ဘက်ခြမ်း: Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Let's collaborate!</h3>
              <p className="text-gray-400 leading-relaxed">
                "Whether you'd like to discuss a project, explore potential collaborations, or have a professional inquiry, feel free to reach out. Let’s build something great together! I’ll get back to you as soon as possible."
              </p>
            </div>

            <div className="space-y-4">
              {/* Email Card */}
              <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-colors">
                <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-400">
                  <Icons.Mail size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Email Me</p>
                  <p className="text-sm font-medium">tzoo2024@gmail.com</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 hover:border-green-500/50 transition-colors">
                <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                  <Icons.Phone size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Call Me</p>
                  <p className="text-sm font-medium">+95 9792460282</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="flex items-center gap-4 bg-gray-900/50 p-4 rounded-2xl border border-gray-800 hover:border-red-500/50 transition-colors">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                  <Icons.MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase">Location</p>
                  <p className="text-sm font-medium">Yangon, Myanmar</p>
                </div>
              </div>
            </div>
          </div>

          {/* ညာဘက်ခြမ်း: Contact Form */}
          <form 
            ref={form} 
            onSubmit={sendEmail} 
            className="w-full space-y-5 bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl shadow-cyan-900/5"
            noValidate 
          >
            <div>
              <label className="text-xs text-gray-400 ml-1 font-semibold uppercase tracking-wider">Your Name</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="Thant Zin Oo"
                className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none mt-1.5 transition-all text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 ml-1 font-semibold uppercase tracking-wider">Email Address</label>
              <input 
                type="email" 
                name="email" 
                required
                placeholder="example@gmail.com"
                className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none mt-1.5 transition-all text-sm"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 ml-1 font-semibold uppercase tracking-wider">Your Message</label>
              <textarea 
                name="message" 
                rows="5" 
                required
                placeholder="How can I help you?"
                className="w-full p-3.5 bg-gray-800 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none mt-1.5 transition-all text-sm resize-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all transform active:scale-95 shadow-lg ${
                isSending 
                ? 'bg-gray-700 cursor-not-allowed opacity-70' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/20'
              }`}
            >
              {isSending ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>SENDING...</span>
                </>
              ) : (
                <>
                  <Icons.Send size={20} />
                  <span>SEND MESSAGE</span>
                </>
              )}
            </button>
          </form>

        </div> 
      </div>
    </section>
  );
};
export default Contact;