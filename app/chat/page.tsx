"use client";

import { useState } from "react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { MessageActions } from "@/components/chat/MessageActions";
import { ChatInput } from "@/components/chat/ChatInput";
import { detectLang, summarize, translate } from "@/services/gemininano";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  detectedLanguage?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [detecting, setDetecting] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    let detectedLang = "en";
    let detectedLangSymbol = "en";

    await detectLang(content, {
      setDetecting,
      setDetectedLangSymbol: (symbol: any) => (detectedLangSymbol = symbol),
      setDetectedLang: (name: string) => (detectedLang = name),
    });

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: `🤖 Gemini AI response to: ${content}`,
      isUser: false,
      timestamp: new Date().toLocaleTimeString(),
      detectedLanguage: detectedLangSymbol,
    };

    setMessages((prev) => [...prev, aiMessage]);
  };

  const handleSummarize = async (id: string) => {
    try {
      const updatedMessages = await Promise.all(
        messages.map(async (msg) => {
          if (msg.id === id) {
            const summary = await summarize(msg.content);
            return { ...msg, content: summary };
          }
          return msg;
        })
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Summarization failed", error);
    }
  };

  const handleTranslate = async (id: string, lang: string) => {
    try {
      const updatedMessages = await Promise.all(
        messages.map(async (msg) => {
          if (msg.id === id && msg.detectedLanguage) {
            let translated = "";
            await translate({
              detectedLangSymbol: msg.detectedLanguage,
              targetLanguage: lang,
              content: msg.content,
              setTranslating: () => {},
              setDownloading: () => {},
              setDownloaded: () => {},
              setTranslation: (val: string) => (translated = val),
            });
            return { ...msg, content: translated };
          }
          return msg;
        })
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error("Translation failed", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
            {!message.isUser && message.detectedLanguage && (
              <MessageActions
                onSummarize={() => handleSummarize(message.id)}
                onTranslate={(lang) => handleTranslate(message.id, lang)}
                showSummarize={message.content.length > 150}
                detectedLanguage={message.detectedLanguage}
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} disabled={detecting} />
    </div>
  );
}
