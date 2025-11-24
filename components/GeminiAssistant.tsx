import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { generateSwimAdvice, ChatMessage } from '../services/geminiService';
import { EnrollmentFormData } from '../types';

interface GeminiAssistantProps {
  onFormUpdate?: (data: Partial<EnrollmentFormData>) => void;
}

const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ onFormUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: 1, 
      text: "Hei! Jeg er Idrettsbarnas AI-assistent. Trenger du hjelp til å finne riktig kurs, eller har du andre spørsmål?", 
      sender: 'bot',
      options: [
        { label: "Finne riktig kurs", value: "Jeg trenger hjelp til å finne riktig kurs" },
        { label: "Andre spørsmål", value: "Jeg har andre spørsmål" }
      ]
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  const processResponse = async (userText: string) => {
    const userMsg: ChatMessage = { id: Date.now(), text: userText, sender: 'user' };
    
    // Optimistically update UI
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    let replyRaw = await generateSwimAdvice([...messages, userMsg]);
    let displayText = replyRaw;
    let options: { label: string; value: string }[] | undefined = undefined;

    // 1. Parse <<<UPDATE>>> tags (Form Data)
    const updateRegex = /<<<UPDATE>>>(.*?)<<<END>>>/s;
    const updateMatch = displayText.match(updateRegex);
    if (updateMatch && updateMatch[1]) {
      try {
        const updateData = JSON.parse(updateMatch[1]);
        console.log("Parsed Form Update:", updateData);
        if (onFormUpdate) {
          onFormUpdate(updateData);
        }
        displayText = displayText.replace(updateMatch[0], ''); // Remove JSON from bubble
      } catch (e) {
        console.error("Failed to parse form update JSON", e);
      }
    }

    // 2. Parse <<<OPTIONS>>> tags (Buttons)
    const optionsRegex = /<<<OPTIONS>>>(.*?)<<<END>>>/s;
    const optionsMatch = displayText.match(optionsRegex);
    if (optionsMatch && optionsMatch[1]) {
      try {
        options = JSON.parse(optionsMatch[1]);
        displayText = displayText.replace(optionsMatch[0], ''); // Remove JSON from bubble
      } catch (e) {
        console.error("Failed to parse options JSON", e);
      }
    }

    displayText = displayText.trim();

    const botMsg: ChatMessage = { 
      id: Date.now() + 1, 
      text: displayText, 
      sender: 'bot',
      options: options
    };

    setMessages(prev => [...prev, botMsg]);
    setIsLoading(false);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    await processResponse(input);
  };

  const handleOptionClick = async (value: string) => {
    await processResponse(value);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {isOpen && (
        <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 flex flex-col overflow-hidden animate-fade-in-up" style={{ height: '550px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-700 to-blue-700 p-4 flex justify-between items-center flex-shrink-0">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Svømmeassistent
            </h3>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95 scrollbar-thin scrollbar-thumb-slate-700">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Text Bubble */}
                <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.sender === 'user' 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>

                {/* Option Buttons (Only for bot messages) */}
                {msg.sender === 'bot' && msg.options && msg.options.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2 max-w-[90%]">
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleOptionClick(opt.value)}
                        className="bg-slate-800 hover:bg-cyan-900/50 border border-cyan-500/30 text-cyan-300 text-xs font-medium px-3 py-2 rounded-full transition-all hover:scale-105 active:scale-95 text-left"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-800 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-700">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-slate-900 border-t border-slate-800 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Skriv svar her..."
                className="flex-1 bg-slate-800 text-white placeholder-slate-500 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-700"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-full p-2.5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && (
        <div className="relative">
             <div className="absolute -top-12 right-0 bg-white text-slate-900 px-4 py-2 rounded-xl rounded-br-none shadow-lg mb-2 text-sm font-bold whitespace-nowrap animate-bounce origin-bottom-right">
                Hjelp til å finne riktig kurs? 👋
            </div>
            <button
            onClick={() => setIsOpen(true)}
            className="bg-cyan-500 hover:bg-cyan-400 text-white p-4 rounded-full shadow-lg shadow-cyan-900/50 hover:scale-110 transition-all duration-300 group"
            aria-label="Åpne chat"
            >
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
            </button>
        </div>
      )}
    </div>
  );
};

export default GeminiAssistant;