import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '../../constants/data';

const INITIAL_WELCOME = `Hi 👋 I'm Sun Bright Properties' AI Property Consultant. I can help you:

    Choose the right premium plot or luxury villa
    Explain projects, layouts & approved amenities
    Compare Villas vs. Open Plots vs. Commercial
    Explain registrations, clear titles & approvals
    Help you schedule a private site visit

What can I help you with today?`;

const quickActions = [
  "Luxury Villa Options",
  "Plots vs Villas",
  "Registration Process",
  "Prime Locations",
  "Investment & ROI",
  "WhatsApp Us 💬",
  "Book Site Visit"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const messageIdRef = useRef(100);
  const chatBodyRef = useRef(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: INITIAL_WELCOME,
      sender: "bot",
      time: getCurrentTime()
    }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll to bottom smoothly when new messages arrive
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping, isOpen]);

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: ++messageIdRef.current,
        text: INITIAL_WELCOME,
        sender: "bot",
        time: getCurrentTime()
      }
    ]);
  };

  const handleClearChat = () => {
    // Deletes previous conversation history and resets to the default welcome message
    setMessages([
      {
        id: ++messageIdRef.current,
        text: INITIAL_WELCOME,
        sender: "bot",
        time: getCurrentTime()
      }
    ]);
  };

  const getBotResponse = (input) => {
    const text = input.toLowerCase();

    // WhatsApp Action
    if (text.includes("whatsapp")) {
      return {
        text: "Connecting you directly to our WhatsApp support line on +91 7799250555...",
        whatsapp: true
      };
    }
    
    // 1. Greetings & Small Talk
    if (text.includes("hello") || text.includes("hi") || text.includes("hey")) {
      return {
        text: "Greetings from Sun Bright Properties! I am your AI Consultant, dedicated to finding your perfect luxury plot or villa. How may I assist your search today?"
      };
    }
    if (text.includes("how are you")) {
      return {
        text: "I'm doing great and always excited to assist you with prime real estate in Hyderabad! How can I guide you today?"
      };
    }
    if (text.includes("thank")) {
      return {
        text: "You're very welcome! It's our absolute pleasure to assist you. Let me know if you need any property brochures or layout details."
      };
    }

    // 2. Villa Listings & Details
    if (text.includes("villa")) {
      return {
        text: "Our signature luxury villas feature private pools, expansive gardens, solar power backup, and contemporary architectural layouts. Here are our featured villas:",
        cards: [
          {
            id: 1,
            title: "Grand Royale Villa",
            tag: "Luxury Villa",
            price: "₹3.5 Cr",
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600",
            link: "/designs"
          },
          {
            id: 2,
            title: "Serene Palms Villa",
            tag: "Gated Community",
            price: "₹4.2 Cr",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=600",
            link: "/designs"
          }
        ]
      };
    }

    // 3. Open Plots & HMDA/RERA
    if (text.includes("plot") || text.includes("land") || text.includes("layout")) {
      return {
        text: "We offer 100% HMDA and RERA-approved open plots in high-growth corridors with underground drainage, 40-foot blacktop roads, 24/7 security, and clear titles.",
        cards: [
          {
            id: 3,
            title: "Skyview Elite HMDA Plots",
            tag: "HMDA Approved",
            price: "₹1.25 Cr+",
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600",
            link: "/designs"
          }
        ]
      };
    }

    // 4. Pricing & Budget
    if (text.includes("price") || text.includes("cost") || text.includes("budget") || text.includes("how much") || text.includes("crore") || text.includes("lakh")) {
      return {
        text: "Our verified layouts start from ₹1.25 Cr for premium gated community plots and luxury villas. We offer 100% clear titles and bank loan approvals with leading financial institutions."
      };
    }

    // 5. Booking & Site Visits
    if (text.includes("book") || text.includes("tour") || text.includes("visit") || text.includes("consultation")) {
      return {
        text: `We would be delighted to host you for a private site inspection! You can call us directly at ${CONTACT_INFO.phone} or chat instantly on WhatsApp:`,
        whatsapp: true
      };
    }

    // 6. Investment & ROI
    if (text.includes("investment") || text.includes("roi") || text.includes("returns") || text.includes("appreciation")) {
      return {
        text: "Sun Bright properties enjoy strong historical capital appreciation of 12-18% annually due to prime connectivity along growth corridors and fast infrastructure development."
      };
    }

    // 7. Registration & Process
    if (text.includes("registration") || text.includes("legal") || text.includes("title") || text.includes("documents") || text.includes("process")) {
      return {
        text: "Every property undergoes a 30-year legal title verification, spot registration support, and 100% clear RERA/HMDA approvals with leading bank tie-ups."
      };
    }

    // 8. Contact / Agent
    if (text.includes("contact") || text.includes("phone") || text.includes("call") || text.includes("agent") || text.includes("location") || text.includes("address")) {
      return {
        text: `You can reach our senior advisors at ${CONTACT_INFO.phone} (${CONTACT_INFO.email}), or visit our head office at ${CONTACT_INFO.address}.`,
        whatsapp: true
      };
    }

    // Fallback
    return {
      text: "Thank you for reaching out. Would you like a detailed project brochure, layout map, or direct WhatsApp assistance from our lead advisor?",
      whatsapp: true
    };
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = { 
      id: ++messageIdRef.current, 
      text: inputValue, 
      sender: "user",
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = getBotResponse(inputValue);
      const botResponse = { 
        id: ++messageIdRef.current, 
        text: responseObj.text,
        cards: responseObj.cards,
        whatsapp: responseObj.whatsapp,
        sender: "bot",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 900);
  };

  const handleAction = (action) => {
    if (action.includes("WhatsApp")) {
      window.open('https://wa.me/917799250555?text=Hi%20Sun%20Bright%20Properties,%20I%20am%20inquiring%20via%20your%20AI%20Assistant%20regarding%20luxury%20plots%20and%20villas.', '_blank');
    }

    const userMsg = { 
      id: ++messageIdRef.current, 
      text: action, 
      sender: "user",
      time: getCurrentTime()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = getBotResponse(action);
      setMessages(prev => [...prev, { 
        id: ++messageIdRef.current, 
        text: responseObj.text,
        cards: responseObj.cards,
        whatsapp: responseObj.whatsapp,
        sender: "bot",
        time: getCurrentTime()
      }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="chatbot-wrapper">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window-modern"
            initial={{ opacity: 0, y: 40, scale: 0.88, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.88 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            {/* Header matching screenshot */}
            <div className="chat-modern-header">
              <div className="chat-header-left">
                <button className="header-icon-btn" title="Sidebar">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="3"/>
                    <line x1="9" y1="3" x2="9" y2="21"/>
                  </svg>
                </button>

                <div className="bot-avatar-badge">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                    <path d="M12 2.5C12.4 6.8 15.2 9.6 19.5 10C15.2 10.4 12.4 13.2 12 17.5C11.6 13.2 8.8 10.4 4.5 10C8.8 9.6 11.6 6.8 12 2.5Z"/>
                    <path d="M19.5 2v3.5m-1.75-1.75h3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                    <circle cx="5.5" cy="18.5" r="1.5" fill="white"/>
                  </svg>
                </div>

                <div className="bot-title-group">
                  <span className="bot-main-name">AI Property Consultant</span>
                  <span className="bot-powered-by">
                    <span className="online-indicator-dot"></span>
                    Powered by Sun Bright Properties
                  </span>
                </div>
              </div>

              <div className="chat-header-right">
                <button className="header-icon-btn" onClick={handleResetChat} title="New Chat">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </button>
                <button className="header-icon-btn" onClick={handleClearChat} title="Clear Messages">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                  </svg>
                </button>
                <button className="header-icon-btn close-btn" onClick={() => setIsOpen(false)} title="Close">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Messages Body */}
            <div className="chat-modern-body" ref={chatBodyRef}>
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div 
                    key={msg.id} 
                    className={`modern-message-row ${msg.sender}`}
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <div className="modern-message-card">
                      <div className="modern-message-text">{msg.text}</div>

                      {/* Interactive Property Mini Cards */}
                      {msg.cards && msg.cards.length > 0 && (
                        <div className="chat-property-cards">
                          {msg.cards.map(card => (
                            <div key={card.id} className="chat-property-mini-card">
                              <img src={card.image} alt={card.title} className="mini-card-img" />
                              <div className="mini-card-info">
                                <span className="mini-card-tag">{card.tag}</span>
                                <span className="mini-card-title">{card.title}</span>
                                <span className="mini-card-price">{card.price}</span>
                                <Link to={card.link} className="mini-card-btn" onClick={() => setIsOpen(false)}>
                                  View Property →
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Direct WhatsApp CTA Button */}
                      {msg.whatsapp && (
                        <a
                          href="https://wa.me/917799250555?text=Hi%20Sun%20Bright%20Properties,%20I%20am%20inquiring%20via%20your%20AI%20Assistant%20regarding%20luxury%20plots%20and%20villas."
                          target="_blank"
                          rel="noreferrer"
                          className="chat-whatsapp-cta"
                        >
                          <span>💬 Chat on WhatsApp (+91 77992 50555)</span>
                        </a>
                      )}
                    </div>

                    {msg.sender === 'bot' && (
                      <div className="message-meta-row">
                        <span className="message-time-text">{msg.time}</span>
                        <button 
                          className="copy-text-btn" 
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy text"
                        >
                          {copiedId === msg.id ? (
                            <span style={{ color: '#10b981', fontSize: '0.72rem', fontWeight: 'bold' }}>✓ Copied</span>
                          ) : (
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                          )}
                        </button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div 
                  className="modern-message-row bot"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="modern-message-card typing-card">
                    <span className="modern-typing-dot dot-1"></span>
                    <span className="modern-typing-dot dot-2"></span>
                    <span className="modern-typing-dot dot-3"></span>
                  </div>
                </motion.div>
              )}

              {/* Quick Action Pills matching screenshot */}
              <div className="modern-quick-actions">
                {quickActions.map((action, i) => (
                  <motion.button 
                    key={action} 
                    onClick={() => handleAction(action)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 + 0.05 }}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    className="modern-pill-btn"
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Footer / Input Area matching screenshot */}
            <div className="chat-modern-footer">
              <form className="chat-modern-input-bar" onSubmit={handleSendMessage}>
                <input 
                  type="text" 
                  placeholder="Ask anything about Sun Bright Properties..." 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <motion.button 
                  type="submit"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="modern-send-btn"
                  title="Send message"
                >
                  <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="19" x2="12" y2="5"/>
                    <polyline points="5 12 12 5 19 12"/>
                  </svg>
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button with Hover Tooltip */}
      <div 
        className="chat-toggle-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.div 
              className="chat-hover-tooltip"
              initial={{ opacity: 0, x: 15, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => setIsOpen(true)}
            >
              <span>Ask Sun Bright Properties AI</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          className={`chat-toggle ${isOpen ? 'open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          animate={{
            boxShadow: isOpen 
              ? "0 10px 30px rgba(212, 175, 55, 0.4)" 
              : [
                  "0 0 0 0 rgba(212, 175, 55, 0.5)",
                  "0 0 0 14px rgba(212, 175, 55, 0)",
                  "0 0 0 0 rgba(212, 175, 55, 0)"
                ]
          }}
          transition={{
            boxShadow: {
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'inline-block', fontSize: '1.2rem', color: '#fff' }}
              >
                ✕
              </motion.span>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {/* AI Sparkle Icon matching screenshot */}
                <svg viewBox="0 0 24 24" width="28" height="28" fill="white">
                  <path d="M12 2.5C12.4 6.8 15.2 9.6 19.5 10C15.2 10.4 12.4 13.2 12 17.5C11.6 13.2 8.8 10.4 4.5 10C8.8 9.6 11.6 6.8 12 2.5Z"/>
                  <path d="M19.5 2v3.5m-1.75-1.75h3.5" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
                  <circle cx="5.5" cy="18.5" r="1.5" fill="white"/>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
};

export default Chatbot;
