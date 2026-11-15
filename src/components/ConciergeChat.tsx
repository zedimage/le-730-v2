import React, { useState } from 'react';
import { Calendar, MessageCircle, Send, X } from 'lucide-react';
import { UNIT_PLANS } from '../data/units';
import { ChatMessage, Language } from '../types/riviera';
import { getConciergeReply } from '../utils/booking';

interface ConciergeChatProps {
  lang: Language;
  onJumpToBooking: () => void;
}

export const ConciergeChat: React.FC<ConciergeChatProps> = ({
  lang,
  onJumpToBooking,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'advisor',
      text:
        lang === 'fr'
          ? 'Bonjour ! Je suis votre conseiller pour Le 730 Notre-Dame. Comment puis-je vous aider pour nos unités 3 ½, 4 ½ ou 5 ½ au bord du fleuve ?'
          : 'Hello! I am your Le 730 Notre-Dame leasing advisor. How can I assist you with our 3 ½, 4 ½, or 5 ½ riverfront suites?',
      timestamp: 'En ligne',
    },
  ]);

  const quickTopics =
    lang === 'fr'
      ? ['Disponibilités & prix', 'Stationnement & VÉ', 'Animaux acceptés', 'Confidentialité Loi 25']
      : ['Availability & rates', 'Parking & EV', 'Pets allowed', 'Law 25 Privacy'];

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const nowTime = new Date().toLocaleTimeString(lang === 'fr' ? 'fr-CA' : 'en-CA', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: trimmed,
      timestamp: nowTime,
    };

    const replyText = getConciergeReply(trimmed, UNIT_PLANS, lang);
    const advisorMsg: ChatMessage = {
      id: `a-${Date.now() + 1}`,
      sender: 'advisor',
      text: replyText,
      timestamp: nowTime,
    };

    setMessages((prev) => [...prev, userMsg, advisorMsg]);
    setDraft('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3">
      {isOpen && (
        <div
          role="dialog"
          aria-label={lang === 'fr' ? 'Clavardage conseiller en location' : 'Leasing advisor chat'}
          className="w-[calc(100vw-2rem)] max-w-[370px] rounded-lg overflow-hidden border border-[#C5A880]/50 bg-[#FBF9F6] shadow-ambient"
        >
          {/* Deep River Blue Header */}
          <div className="px-4 py-3.5 bg-[#122338] text-[#FBF9F6] flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
                Le 730 Notre-Dame
              </p>
              <p className="font-display text-base font-medium">
                {lang === 'fr' ? 'Conseiller en location' : 'Leasing Concierge'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={lang === 'fr' ? 'Fermer le clavardage' : 'Close chat'}
              className="w-8 h-8 inline-flex items-center justify-center rounded border border-[#C5A880]/40 hover:bg-[#1A365D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#FBF9F6]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-lg text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#122338] text-[#FBF9F6]'
                      : 'bg-[#FFFFFF] border border-[#C5A880]/35 text-[#2C3E50]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-3.5 py-2 border-t border-[#C5A880]/25 bg-[#EFE8DC]/50 flex flex-wrap gap-1.5">
            {quickTopics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => sendMessage(topic)}
                className="px-2.5 py-1 bg-[#FFFFFF] border border-[#C5A880]/40 rounded text-[11px] font-medium text-[#122338] hover:border-[#122338] transition-colors cursor-pointer"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* Input + Jump to Booking */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(draft);
            }}
            className="p-3 bg-[#FFFFFF] border-t border-[#C5A880]/30 flex items-center gap-2"
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={lang === 'fr' ? 'Posez votre question…' : 'Ask a question…'}
              aria-label={lang === 'fr' ? 'Message au conseiller' : 'Message to advisor'}
              className="flex-1 min-h-[40px] px-3 py-1.5 bg-[#FBF9F6] border border-[#C5A880]/40 rounded text-sm text-[#122338] focus:outline-none focus:border-[#122338]"
            />
            <button
              type="submit"
              aria-label={lang === 'fr' ? 'Envoyer' : 'Send'}
              className="w-10 h-10 inline-flex items-center justify-center rounded bg-[#122338] text-[#FBF9F6] hover:bg-[#1A365D] cursor-pointer shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onJumpToBooking();
            }}
            className="w-full py-2.5 px-4 bg-[#EFE8DC] border-t border-[#C5A880]/35 text-xs font-semibold text-[#122338] flex items-center justify-center gap-2 hover:bg-[#C5A880]/30 transition-colors cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#725B38]" />
            <span>
              {lang === 'fr' ? 'Réserver ma visite privée' : 'Book My Private Tour'}
            </span>
          </button>
        </div>
      )}

      {/* Compact Floating Trigger (respects 15% mobile sticky cap: 48px high) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onJumpToBooking}
          aria-label={lang === 'fr' ? 'Rendez-vous express' : 'Quick Tour Booking'}
          className="md:hidden inline-flex items-center gap-1.5 h-12 px-4 rounded-full bg-[#C5A880] text-[#FFFFFF] text-xs font-semibold shadow-ambient cursor-pointer"
        >
          <Calendar className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Visite' : 'Tour'}</span>
        </button>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={
            isOpen
              ? lang === 'fr'
                ? 'Fermer le clavardage'
                : 'Close concierge chat'
              : lang === 'fr'
                ? 'Clavarder avec un conseiller'
                : 'Chat with a leasing advisor'
          }
          className="inline-flex items-center gap-2 h-12 px-4 rounded-full bg-[#122338] text-[#FBF9F6] border border-[#D4AF37]/50 shadow-ambient hover:bg-[#1A365D] transition-colors cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 text-[#C5A880]" />
          <span className="hidden sm:inline text-xs font-semibold tracking-[0.03em]">
            {lang === 'fr' ? 'Conseiller en ligne' : 'Leasing Advisor'}
          </span>
        </button>
      </div>
    </div>
  );
};
