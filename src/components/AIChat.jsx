import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsChatDots, BsSend, BsX, BsRobot } from 'react-icons/bs';
import { useLanguage } from '../context/LanguageContext';
import { GoogleGenerativeAI } from "@google/generative-ai";

// For security, the API key should be in a .env file as VITE_GEMINI_API_KEY
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const AIChat = () => {
    const { t, language } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: language === 'ID'
                ? 'Halo! Saya asisten cerdas Muzayyin Arifin Nabhan. Ada yang bisa saya bantu hari ini?'
                : "Hello! I'm Muzayyin Arifin Nabhan's smart assistant. How can I help you today?"
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim() || isTyping) return;

        const userMsg = { id: Date.now(), type: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            if (!genAI) {
                // If no API key, wait 1 second and show a helpful instruction message
                await new Promise(resolve => setTimeout(resolve, 800));
                throw new Error(language === 'ID'
                    ? "API Key Gemini belum dikonfigurasi. Sesuai permintaan Anda untuk menggunakan sumber luar (seperti Google), silakan tambahkan 'VITE_GEMINI_API_KEY' di file .env Anda agar saya bisa berpikir lebih cerdas!"
                    : "Gemini API Key not configured. To enable real AI responses (like Google search capabilities), please add 'VITE_GEMINI_API_KEY' to your .env file!");
            }

            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
                systemInstruction: `You are an AI assistant for Muzayyin Arifin Nabhan's portfolio website. 
                Your goal is to provide information about Muzayyin based on the context provided below, but you can also answer general questions using your broad knowledge (Google-like capabilities).
                
                CONTEXT ABOUT MUZAYYIN (in ${language}):
                - Name: Muzayyin Arifin Nabhan
                - Role: ${t.hero.roles.join(', ')}
                - About: ${t.about.p1} ${t.about.p2}
                - Education: ${JSON.stringify(t.education.list)}
                - Experience: ${JSON.stringify(t.experience.list)}
                - Projects: ${JSON.stringify(t.projects.list)}
                
                INSTRUCTIONS:
                1. Language: ${language === 'ID' ? 'Indonesian' : 'English'}.
                2. If the question relates to the portfolio, use the provided context.
                3. If the question is general, answer it based on your general intelligence.
                4. Be professional, concise, and helpful.`
            });

            const result = await model.generateContent(input);
            const responseText = result.response.text();

            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: responseText }]);
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: error.message || (language === 'ID' ? "Maaf, terjadi masalah koneksi." : "Sorry, a connection issue occurred.")
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 p-4 bg-accent text-light-100 rounded-full shadow-lg shadow-accent/25 hover:bg-accent/90 transition-colors"
                aria-label="Open AI Assistant"
            >
                {isOpen ? <BsX size={24} /> : <BsChatDots size={24} />}
                {!isOpen && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-accent"></span>
                    </span>
                )}
            </motion.button>

            {/* Chat Interface */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.8, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        className="fixed bottom-24 right-6 z-50 w-[350px] sm:w-[400px] h-[550px] glass-card flex flex-col shadow-2xl border-accent/20 overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-primary text-light-100 flex items-center gap-3">
                            <div className="p-2 bg-light-100/20 rounded-lg">
                                <BsRobot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold">Muzayyin AI Assistant</h3>
                                <div className="flex items-center gap-1.5 leading-none">
                                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                    <span className="text-xs opacity-80">{language === 'ID' ? 'Aktif' : 'Online'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 bg-light-200/50 dark:bg-dark-200/50"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                        ? 'bg-primary text-light-100 rounded-tr-none'
                                        : 'bg-light-100 dark:bg-dark-300 text-dark-100 dark:text-light-200 shadow-sm border border-light-300 dark:border-secondary/20 rounded-tl-none'
                                        }`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-light-100 dark:bg-dark-300 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce delay-100"></span>
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-bounce delay-200"></span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="p-4 bg-light-100 dark:bg-dark-300 border-t border-light-300 dark:border-secondary/20">
                            <div className="relative flex items-center gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder={language === 'ID' ? 'Tanya apa saja...' : 'Ask anything...'}
                                    className="flex-1 bg-light-200 dark:bg-dark-200 border border-light-300 dark:border-secondary/30 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition-all text-dark-100 dark:text-light-200"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim() || isTyping}
                                    className="p-2.5 bg-accent text-light-100 rounded-full hover:bg-accent/90 transition-colors disabled:opacity-50"
                                >
                                    <BsSend size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default AIChat;
