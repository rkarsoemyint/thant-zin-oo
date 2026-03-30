import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare, Send, MessageCircleCode, ChevronDown, SendHorizontal } from 'lucide-react';
import Groq from "groq-sdk";


const apiKey = import.meta.env.VITE_GROQ_API_KEY;
const groq = new Groq({ 
  apiKey: apiKey, 
  dangerouslyAllowBrowser: true 
});

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'မင်္ဂလာပါ! ကျွန်တော်က Thant Zin Oo ရဲ့ AI Assistant ပါ။ ဘာကူညီပေးရမလဲခင်ဗျာ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef(null);

  // စာရိုက်တိုင်း အောက်ဆုံးကို auto scroll ဆင်းဖို့ပါ
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true); 

    try {
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `မင်းက Thant Zin Oo ရဲ့ Portfolio အတွက် AI Assistant ဖြစ်တယ်။ 
            သူ့အကြောင်း အချက်အလက်တွေကတော့:
            - နာမည်: သန့်ဇင်ဦး (Thant Zin Oo)၊ Web Engineer တစ်ယောက်ဖြစ်တယ်။
            - ပညာအရည်အချင်း: M.Sc. in Animation (AAFT, India) ဘွဲ့ရထားတယ်။
            - ကျွမ်းကျင်မှု: Python (Django), JavaScript (React, Node.js), PHP, Firebase, Tailwind CSS.
            - Projects: UkeLearn (Ukelele သင်ကြားရေး App), Wallet Flow (PWA Expense Tracker).
            - မေးခွန်းတွေကို ယဉ်ကျေးပျူငှာစွာ မြန်မာလို (သို့မဟုတ်) အင်္ဂလိပ်လို ဖြေကြားပေးပါ။`
          },
          ...messages.map(m => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.text
          })),
          { role: "user", content: input }
        ],
        model: "llama-3.3-70b-versatile", // အရမ်းမြန်ပြီး တော်တဲ့ Model ပါ
      });

      const botText = chatCompletion.choices[0]?.message?.content || "";
      setMessages(prev => [...prev, { role: 'bot', text: botText }]);

    } catch (error) {
      console.error("Groq Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: 'စိတ်မရှိပါနဲ့ခင်ဗျာ၊ ခဏနေမှ ပြန်မေးပေးပါဦး။' }]);
    } finally {
      setIsTyping(false); 
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 h-[450px] bg-white dark:bg-gray-900 shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-bold text-sm">Thant's AI Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)}><X size={18} /></button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-gray-950/50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-lg text-[10px] animate-pulse">စဉ်းစားနေသည်...</div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t dark:border-gray-800 flex gap-2 bg-white dark:bg-gray-900">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="မေးခွန်းမေးပါ..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-none rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
              />
              <button 
                onClick={handleSend} 
                disabled={isTyping}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        {isOpen ? <MessageSquare size={24} /> : <Bot size={24} />}
      </motion.button>
    </div>
  );
};

export default AIChatBot;