"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  X,
  Send,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  Bot,
  User,
  ShieldCheck,
} from "lucide-react";
import { saveCalculatorLead } from "@/lib/appwrite";

const QUICK_TOPICS = [
  "NPI & DFM Audits",
  "Six Sigma Yield & SMT",
  "ISO Cleanroom Standards",
  "Join Expert Bench",
];

export function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [messages, setMessages] = useState([
    {
      id: "msg-welcome",
      sender: "agent",
      text: "Hi there! 👋 How can we help you today with your hardware, SMT, or semiconductor manufacturing project?",
      time: "Just now",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [isAskingContact, setIsAskingContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto-scroll inside chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Handle Quick Topic Click
  const handleQuickTopic = (topic) => {
    handleSendMessage(`I'm interested in: ${topic}`);
  };

  // Send message
  const handleSendMessage = (textToSend = null) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // If user hasn't submitted email yet, prompt for contact
    if (!hasSubmitted) {
      setIsAskingContact(true);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `agent-contact-${Date.now()}`,
            sender: "agent",
            text: "Got it! Please share your email address so our engineering team can send you the details and follow up directly.",
            time: "Just now",
          },
        ]);
      }, 600);
    } else {
      // Already has email, just acknowledge and save to database
      submitLeadToAppwrite(text);
    }
  };

  // Submit Lead & Contact Info
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!userEmail) return;

    setIsSubmitting(true);
    const lastUserMessage =
      messages.filter((m) => m.sender === "user").slice(-1)[0]?.text || "General Consultation Inquiry";

    await submitLeadToAppwrite(lastUserMessage);

    setIsAskingContact(false);
    setHasSubmitted(true);
    setIsSubmitting(false);

    setMessages((prev) => [
      ...prev,
      {
        id: `agent-thanks-${Date.now()}`,
        sender: "agent",
        text: `Thank you! We've received your inquiry. A principal engineer will review your request and reach out to ${userEmail} shortly.`,
        time: "Just now",
      },
    ]);
  };

  const submitLeadToAppwrite = async (inquiryText) => {
    try {
      await saveCalculatorLead({
        email: userEmail || "chat-visitor@anonymous.local",
        name: userName || "Website Visitor",
        company: "Direct Chat Inquiry",
        phone: "",
        calculatorType: "chat_bubble_inquiry",
        score: null,
        metrics: {
          inquiry: inquiryText,
          chatHistory: messages.map((m) => `${m.sender}: ${m.text}`).join(" | "),
        },
      });
    } catch (err) {
      console.warn("Chat lead storage fallback:", err.message);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      {/* 1. Teaser Speech Bubble (Visible when chat is closed) */}
      <AnimatePresence>
        {!isOpen && showTeaser && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="mb-1.5 max-w-[210px] rounded-lg border border-border/80 bg-card/95 backdrop-blur-md p-2 shadow-md flex items-start gap-2 cursor-pointer group"
            onClick={() => {
              setIsOpen(true);
              setShowTeaser(false);
            }}
          >
            <div className="size-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
              <Bot className="size-3" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                Need engineering help? 👋
              </p>
              <p className="text-[9.5px] text-muted-foreground leading-tight mt-0.5 truncate">
                Ask about SMT or DFM audits
              </p>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowTeaser(false);
              }}
              className="text-muted-foreground hover:text-foreground p-0.5 rounded-full"
              aria-label="Dismiss teaser"
            >
              <X className="size-2.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Expanded Chat Card Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[calc(100vw-2rem)] sm:w-[320px] rounded-xl border border-border/80 bg-card shadow-xl overflow-hidden flex flex-col h-[390px] max-h-[75vh] mb-2"
          >
            {/* Header */}
            <div className="p-2.5 px-3 border-b border-border bg-secondary/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="size-7 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-[10px] border border-primary/20">
                    VC
                  </div>
                  <span className="absolute bottom-0 right-0 size-2 rounded-full bg-emerald-500 border border-background" />
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold text-foreground flex items-center gap-1">
                    <span>Engineering Advisory</span>
                    <ShieldCheck className="size-3 text-primary" />
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer transition-colors"
                  aria-label="Close chat"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-background/50 text-[11px]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground rounded-br-xs shadow-xs"
                        : "bg-secondary/80 text-foreground border border-border/80 rounded-bl-xs"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-muted-foreground mt-0.5 px-1">{msg.time}</span>
                </div>
              ))}

              {/* Quick Topics (shown only initially) */}
              {messages.length === 1 && (
                <div className="pt-1">
                  <p className="text-[9.5px] uppercase font-mono tracking-wider text-muted-foreground mb-1.5">
                    Quick Topics:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {QUICK_TOPICS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => handleQuickTopic(topic)}
                        className="px-2 py-0.5 rounded-full border border-border/80 bg-card hover:bg-secondary text-foreground text-[10px] font-medium transition cursor-pointer"
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information Capture Prompt */}
              {isAskingContact && (
                <motion.form
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleContactSubmit}
                  className="p-2.5 rounded-lg border border-primary/30 bg-primary/5 space-y-2 mt-1.5"
                >
                  <div className="text-[10.5px] font-semibold text-foreground">
                    Where should we reply?
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Your work email *"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-2.5 py-1 rounded-md border border-border bg-background text-foreground text-[11px] focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="Your name (optional)"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-2.5 py-1 rounded-md border border-border bg-background text-foreground text-[11px] focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-1.5 rounded-md bg-primary text-primary-foreground font-semibold text-[11px] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? "Saving..." : "Submit Inquiry"}
                  </button>
                </motion.form>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-2 px-2.5 border-t border-border bg-card flex items-center gap-1.5"
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-full border border-border bg-background text-foreground text-[11px] focus:outline-none focus:ring-1.5 focus:ring-primary/40"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="size-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition disabled:opacity-40 cursor-pointer shrink-0 shadow-xs"
                aria-label="Send message"
              >
                <Send className="size-3" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Floating Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) setShowTeaser(false);
        }}
        className="size-11 sm:size-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 cursor-pointer relative transition-transform duration-200"
        aria-label={isOpen ? "Close chat" : "Open chat support"}
      >
        {isOpen ? (
          <ChevronDown className="size-5" />
        ) : (
          <>
            <MessageCircle className="size-5" />
            <span className="absolute top-1 right-1 size-2.5 rounded-full bg-emerald-500 border border-primary" />
          </>
        )}
      </motion.button>
    </div>
  );
}

export default ChatBubble;
