import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { Trash2, User, Mail, Calendar, MessageSquare } from 'lucide-react';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const deleteMessage = async (id) => {
    if (window.confirm("ဒီ Message ကို ဖျက်မှာ သေချာပါသလား?")) {
      await deleteDoc(doc(db, "messages", id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {messages.length === 0 ? (
          <div className="text-center py-20 text-gray-500">Message မရှိသေးပါဘူးဗျ။</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg dark:text-white">{msg.name}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-2">
                      <Mail size={14} /> {msg.email}
                    </p>
                  </div>
                </div>
                <button onClick={() => deleteMessage(msg.id)} className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all">
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl mb-4 border border-gray-100 dark:border-gray-800">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  <MessageSquare size={16} className="inline mr-2 text-blue-500" />
                  "{msg.message}"
                </p>
              </div>

              <div className="text-[10px] uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Calendar size={12} />
                {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleString() : "ခုနတင်"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageManager;
